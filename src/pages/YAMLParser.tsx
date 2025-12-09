import React from 'react';
import * as yaml from 'js-yaml';
import Paragraph from '../widgets/Paragraph';

type YAMLPage = { title?: string, content: string }[];

export default function YAMLParser({ markup }: { markup: string }): React.JSX.Element[] {
    const content = yaml.load(markup) as YAMLPage;

    return content.flatMap(
        (paragraph, i) => <Paragraph key={i} title={paragraph.title}>{paragraph.content}</Paragraph>
    );
}