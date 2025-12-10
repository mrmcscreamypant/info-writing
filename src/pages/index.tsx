import React from 'react';
import Page from '../core/Page';

import Paragraph from '../widgets/Paragraph';
import AppLink from '../widgets/AppLink';
import { AppRoute } from '../AppRoutes';
import { Text } from '@radix-ui/themes';

export default function Index(): React.JSX.Element {
    return <Page>
        <Paragraph title="Hello Wold">
            <Text>There is quite a lot going on here</Text>
        </Paragraph>
        <Paragraph title="Helpful Buttons">
            <AppLink to={AppRoute.NARRATIVE} text='Personal Narrative' />
        </Paragraph>
    </Page>;
}