import React from 'react';
import Page from '../core/Page';
import CodeSample, { CodeLanguage } from '../core/CodeSample';

import sample from '../core/CodeSample?raw';

export default function Index(): React.JSX.Element {
    return <Page>
        <CodeSample content={sample} language={CodeLanguage.TS}></CodeSample>
    </Page>;
}