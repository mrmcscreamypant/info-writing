import React from 'react';
import Page from '../core/Page';
import YAMLParser from '../core/YAMLParser';

import document from './pro-con.yaml?raw';
import AppImage from '../widgets/AppImage';
import CodeSample, { CodeLanguage } from '../widgets/CodeSample';

import verboseJavaSample from './codeSamples/HelloWorld.java?raw';
import XKCDCredit from './XKCDCredit';

export default function ProConPage(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} figs={{
            python: <AppImage
                src="https://imgs.xkcd.com/comics/python.png"
                credit={<XKCDCredit />}
                caption='Fun Fact: python actually has the "antigravity" module, which - when imported - opens up this comic in a webbrowser.'
            />,
            python3: <CodeSample content='print("Hello, world!")' language={CodeLanguage.PY} file='helloWorld.py' />,
            verboseJava: <CodeSample content={verboseJavaSample} language={CodeLanguage.JAVA} file='App.java' />
        }} />
    </Page>;
}