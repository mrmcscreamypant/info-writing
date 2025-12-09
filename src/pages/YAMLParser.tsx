import React from 'react';
import { load } from 'js-yaml';
import Paragraph from '../widgets/Paragraph';
import { Text } from '@radix-ui/themes';


type YAMLParagraph = { title?: string, content: string, fig?: null };
type YAMLPage = (YAMLParagraph)[];

export default function YAMLParser({ markup, figs }: { markup: string, figs?: { [key: string]: React.JSX.Element } }): React.JSX.Element[] {
    const content = load(markup) as YAMLPage;

    return content.flatMap(
        (paragraph, i: number) => <Paragraph key={i} title={paragraph.title}>
            {paragraph.fig ? figs[paragraph.fig] : <Text>{paragraph.content}</Text>}
        </Paragraph>
    );
}