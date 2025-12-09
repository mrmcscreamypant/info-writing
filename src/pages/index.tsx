import React from 'react';
import Page from '../core/Page';

import Paragraph from '../widgets/Paragraph';
import AppLink from '../widgets/AppLink';
import { AppRoute } from '../AppRoutes';

export default function Index(): React.JSX.Element {
    return <Page>
        <Paragraph title="Hello Wold">
            There is quite a lot going on here
        </Paragraph>
        <AppLink to={AppRoute.NARRATIVE} text='Personal Narrative' />
    </Page>;
}