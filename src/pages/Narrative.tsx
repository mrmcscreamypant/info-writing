import React from 'react';
import Page from '../core/Page';

import document from './narrative.yaml?raw';
import YAMLParser from './YAMLParser';
import CodeSample, { CodeLanguage } from '../widgets/CodeSample';

import spaghettiCodeSample from '../background/Engine?raw';

export default function Narrative(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} figs={{
            spaghetti: <CodeSample content={spaghettiCodeSample} language={CodeLanguage.TS} file='Engine.ts' />,
        }} />
    </Page>;
}