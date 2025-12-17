import React from 'react';
import Page from '../core/Page';
import YAMLParser from '../core/YAMLParser';

import document from './pro-con.yaml?raw';
import AppImage from '../widgets/AppImage';

const xkcdCredit = "Comic by Randall Munroe, xkcd.com (Creative Commons Attribution-NonCommercial 2.5)";

export default function ProConPage(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} figs={{
            python: <AppImage
                src="https://imgs.xkcd.com/comics/python.png"
                credit={xkcdCredit}
                caption='Fun Fact: python actually has the "antigravity" module, which - when imported - opens up this comic in a webbrowser. This comic uses python 2, so the print statement is out of date.'
            />
        }} />
    </Page>;
}