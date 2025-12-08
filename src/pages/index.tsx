import React from 'react';
import Page from '../core/Page';
import CodeSample, { CodeLanguage } from '../core/CodeSample';

import sampleRaw from '../../package.json';
import Paragraph from '../widgets/Paragraph';

const sample = JSON.stringify(sampleRaw);

export default function Index(): React.JSX.Element {
    return <Page>
        <Paragraph title="Hello Wold">{sample}</Paragraph>
        <Paragraph title="Hello Wold">{sample}</Paragraph>
        <Paragraph title="Hello Wold">{sample}</Paragraph>
        <Paragraph title="Hello Wold">{sample}</Paragraph>
        <Paragraph title="Hello Wold">{sample}</Paragraph>
        <Paragraph title="Hello Wold">{sample}</Paragraph>
    </Page>;
}