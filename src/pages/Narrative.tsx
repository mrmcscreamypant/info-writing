import React from 'react';
import Page from '../core/Page';
import Paragraph from '../widgets/Paragraph';

export default function Narrative(): React.JSX.Element {
    return <Page>
        <Paragraph>
            In case you haven't noticed by now, this was not made purley in Google Sheets.
        </Paragraph>
    </Page>;
}