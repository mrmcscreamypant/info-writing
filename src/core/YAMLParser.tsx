import React from 'react';
import { renderToString } from 'react-dom/server';
import { load } from 'js-yaml';
import Paragraph from '../widgets/Paragraph';
import { Badge, Card, Flex, IconButton, Text } from '@radix-ui/themes';


import { AnimatePresence, motion } from 'motion/react';

import * as Icons from '@radix-ui/react-icons';

type Def = { term: string, meaning: string };
type YAMLParagraph = { title?: string, content: string, fig?: null, defs?: Def[] };
type YAMLPage = YAMLParagraph[];

function Definition({ term, meaning }: Def): React.JSX.Element {
    return <>
        <Badge>{term}</Badge><br />
        <Text size="2">{meaning}</Text><br />
    </>;
}

function DefinitionList({ defs, contentHook }: { defs: Def[], contentHook: [string, (value: string) => void] }): React.JSX.Element {
    const [defHovered, setDefHovered] = React.useState(false);
    const [content, setContent] = contentHook;

    React.useEffect(() => {
        const highlited = (term: string): string => renderToString(<span style={{ backgroundColor: "yellow", color: "black", borderRadius: "5px", padding: "2px" }}>{term}</span>);

        let newContent = content.replaceAll("\n", " ");
        if (defHovered) {
            for (const def of defs) {
                newContent = newContent.replaceAll(def.term, highlited(def.term));
            }
            setContent(newContent);
            return;
        }
        for (const def of defs) {
            newContent = newContent.replaceAll(highlited(def.term), def.term);
        }
        setContent(newContent);
    }, [defHovered]);

    return <motion.div
        onHoverStart={() => setDefHovered(true)}
        onHoverEnd={() => setDefHovered(false)}
        style={{
            minWidth: "20%",

            minHeight: "50%",
            maxHeight: "100%",

            alignContent: "center",
            textAlign: "center",

            marginLeft: "8px",
            position: "relative",
            zIndex: 100,
        }}
        initial={{
            width: "10%"
        }}
        whileHover={{
            width: "100%"
        }}
    >
        {defHovered ? <Card asChild>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    width: "100%",
                    right: 0
                }}
            >
                {defs.flatMap(
                    (def, j: number) => <Definition
                        key={j}
                        term={def.term}
                        meaning={def.meaning}
                    />
                )}
            </motion.div>
        </Card> : <Icons.InfoCircledIcon width="18" height="18" />}
    </motion.div>;
}

export default function YAMLParser({ markup, figs }: { markup: string, figs?: { [key: string]: React.JSX.Element } }): React.JSX.Element[] {
    const content = load(markup) as YAMLPage;

    return content.flatMap(
        (paragraph, i: number) => {
            const contentHook = React.useState(paragraph.content);

            const text = <Text style={{
                width: "90%"
            }} dangerouslySetInnerHTML={{ __html: contentHook[0] }}></Text>;

            return <Paragraph key={i} title={paragraph.title}>
                <Flex flexGrow={"1"}>
                    {paragraph.fig ? figs[paragraph.fig] : text}
                    {paragraph.defs && <DefinitionList defs={paragraph.defs} contentHook={contentHook} />}
                </Flex>
            </Paragraph >;
        }
    );
}