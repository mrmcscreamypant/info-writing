import React from 'react';
import Page from '../core/Page';
import YAMLParser from '../core/YAMLParser';

import markup from './tutorial.yaml?raw';

export default function Tutorial(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={markup} />
    </Page>;
}