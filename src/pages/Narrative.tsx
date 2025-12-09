import React from 'react';
import Page from '../core/Page';

import document from './narrative.yaml?raw';
import YAMLParser from './YAMLParser';

export default function Narrative(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={document} />
    </Page>;
}