import React from 'react';
import Page from '../core/Page';

import document from './narrative.yaml?raw';
import YAMLParser from './YAMLParser';
import CodeSample, { CodeLanguage } from '../widgets/CodeSample';

import cursedCodeSample from '../widgets/Paragraph?raw';
import inceptionCodeSample from '../widgets/CodeSample?raw';

export default function Narrative(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} figs={{
            cursed: <CodeSample content={cursedCodeSample} language={CodeLanguage.TS} file='Paragraph.tsx' />,
            inception: <CodeSample content={inceptionCodeSample} language={CodeLanguage.TS} file='CodeSample.tsx' />
        }} />
    </Page>;
}