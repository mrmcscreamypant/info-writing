import React from 'react';
import { load } from 'js-yaml';
import Paragraph from '../widgets/Paragraph';
import { Badge, Card, Flex, IconButton, Text } from '@radix-ui/themes';

import { AnimatePresence, motion } from 'motion/react';

import * as Icons from '@radix-ui/react-icons';

type Def = { term: string, meaning: string };
type YAMLParagraph = { title?: string, content: string, fig?: null, def?: Def[] };
type YAMLPage = YAMLParagraph[];

function Definition({ term, meaning }: Def): React.JSX.Element {
    return <>
        <Badge>{term}</Badge><br />
        <Text>{meaning}</Text>
    </>;
}

export default function YAMLParser({ markup, figs }: { markup: string, figs?: { [key: string]: React.JSX.Element } }): React.JSX.Element[] {
    const [defHovered, setDefHovered] = React.useState(false);
    const content = load(markup) as YAMLPage;

    return content.flatMap(
        (paragraph, i: number) => <Paragraph key={i} title={paragraph.title}>
            <Flex>
                {paragraph.fig ? figs[paragraph.fig] : <Text>{paragraph.content}</Text>}
                {paragraph.def && <motion.div
                    onHoverStart={() => setDefHovered(true)}
                    onHoverEnd={() => setDefHovered(false)}
                    style={{
                        minWidth: "20%",
                        maxHeight: "100%",
                        minHeight: "100%",
                        alignContent: "center",
                        textAlign: "center"
                    }}
                >
                    {defHovered ? <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Card>
                            {paragraph.def.flatMap(
                                (def, j: number) => <Definition
                                    key={j}
                                    term={def.term}
                                    meaning={def.meaning}
                                />
                            )}
                        </Card>
                    </motion.div> : <IconButton radius="full">
                        <Icons.AccessibilityIcon width="18" height="18"/>
                    </IconButton>}
                </motion.div>}
            </Flex>
        </Paragraph >
    );
}