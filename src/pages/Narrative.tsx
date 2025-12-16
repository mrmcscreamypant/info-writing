import React from 'react';

import Page from '../core/Page';
import AppImage from '../widgets/AppImage';
import YAMLParser from '../core/YAMLParser';
import CodeSample, { CodeLanguage } from '../widgets/CodeSample';

import document from './narrative.yaml?raw';
import spaghettiCodeSample from '../background/Engine?raw';
import htmlCodeSample from '../../index.html?raw';
import entrypointCodeSample from '../index?raw';

const xkcdCredit = "Source: xkcd.com (Creative Commons Attribution-NonCommercial 2.5)";

export default function Narrative(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} figs={{
            spaghetti: <CodeSample content={spaghettiCodeSample} language={CodeLanguage.TS} file='Engine.ts' />,
            knowledge: <AppImage
                src="https://imgs.xkcd.com/comics/average_familiarity.png"
                credit={xkcdCredit}
                caption="Sorry if this is the case. I have to keep reminding myself that most people don't know what functions are."
            />,
            html: <CodeSample
                content={htmlCodeSample}
                language={CodeLanguage.HTML}
                file='index.html'
            />,
            entrypoint: <CodeSample
                content={entrypointCodeSample}
                language={CodeLanguage.TS}
                file='index.tsx'
            />,
            thisIsNotInceptionThisIsFractalAndNotEven: <CodeSample
                content={document}
                language={CodeLanguage.YAML}
                file='narrative.yaml'
            />,
            git: <AppImage
                src="https://imgs.xkcd.com/comics/git.png"
                credit={xkcdCredit}
                caption={`I think I'm getting better at using React, as I did not once have to do this for this project, which is a first. To which you ask: "How does React manage to corrupt your local branch?" "Yes"`}
            />
        }} />
    </Page>;
}