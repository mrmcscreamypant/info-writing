import React from 'react';
import { load } from 'js-yaml';
import Paragraph from '../widgets/Paragraph';
import { Badge, Card, Flex, Text } from '@radix-ui/themes';

import motion

type Def = { term: string, meaning: string };
type YAMLParagraph = { title?: string, content: string, fig?: null, def?: Def[] };
type YAMLPage = YAMLParagraph[];

function Definition({ term, meaning }: Def): React.JSX.Element {
    return <Card size="2">
        <Badge>{term}</Badge><br />
        <Text>{meaning}</Text>
    </Card>;
}

export default function YAMLParser({ markup, figs }: { markup: string, figs?: { [key: string]: React.JSX.Element } }): React.JSX.Element[] {
    const content = load(markup) as YAMLPage;

    return content.flatMap(
        (paragraph, i: number) => <Paragraph key={i} title={paragraph.title}>
            <Flex>
                {paragraph.fig ? figs[paragraph.fig] : <Text>{paragraph.content}</Text>}
                <motion.div>
                {paragraph.def && paragraph.def.flatMap(
                    (def, j: number) => <Definition
                        key={j}
                        term={def.term}
                        meaning={def.meaning}
                    />
                )}
                </motion.div>
            </Flex>
        </Paragraph>
    );
}