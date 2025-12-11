import React from 'react';
import Page from '../core/Page';

import document from './narrative.yaml?raw';
import YAMLParser from '../core/YAMLParser';
import CodeSample, { CodeLanguage } from '../widgets/CodeSample';

import spaghettiCodeSample from '../background/Engine?raw';
import htmlCodeSample from '../../index.html?raw';
import AppImage from '../widgets/AppImage';

export default function Narrative(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} figs={{
            spaghetti: <CodeSample content={spaghettiCodeSample} language={CodeLanguage.TS} file='Engine.ts' />,
            git: <AppImage
                src="https://imgs.xkcd.com/comics/git.png"
                credit="Image credit: xkcd.com"
                caption="I think I'm getting better at using react, as I did not once have to do this for this project, which is a first."
            />,
            html: <CodeSample content={htmlCodeSample} language={CodeLanguage.HTML} file='index.html' />
        }} />
    </Page>;
}