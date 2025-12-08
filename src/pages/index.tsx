import React from 'react';
import Page from '../core/Page';
import CodeSample from '../core/CodeSample';

export default function Index(): React.JSX.Element {
    return <Page>
        <CodeSample content='Hello world'></CodeSample>
    </Page>;
}