import React from 'react';
import Page from '../core/Page';
import YAMLParser from '../core/YAMLParser';

import markup from './tutorial.yaml?raw';
import CodeSample, { CodeLanguage } from '../widgets/CodeSample';

import echo from './codeSamples/echo.py?raw';
import cipher from './codeSamples/cipher.py?raw';

function cipherLines(end: number): string {
    return cipher.split("\n").slice(0, end).join("\n");
}

export default function Tutorial(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={markup} figs={{
            helloworld: <CodeSample content='print("Hello, world!")' language={CodeLanguage.PY} file='helloWorld.py' />,
            echo: <CodeSample content={echo} language={CodeLanguage.PY} file='echo.py' />,
            variable: <CodeSample content={cipherLines(1)} language={CodeLanguage.PY} file='variable.py' />,
            loop: <CodeSample content={cipherLines(5)} language={CodeLanguage.PY} file='loop.py' />,
            cipher: <CodeSample content={cipher} language={CodeLanguage.PY} file='cipher.py' />,
        }} />
    </Page>;
}