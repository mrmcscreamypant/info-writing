import React from 'react';
import Page from '../core/Page';
import CodeSample, { CodeLanguage } from '../core/CodeSample';

import sample from '../../package.json?raw';
import sample2 from '../../package-lock.json?raw';
import Paragraph from '../widgets/Paragraph';

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