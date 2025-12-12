import React from 'react';
import Page from '../core/Page';

import Paragraph from '../widgets/Paragraph';
import AppLink from '../widgets/AppLink';
import { AppRoute } from '../AppRoutes';
import { Text } from '@radix-ui/themes';

export default function Index(): React.JSX.Element {
    return <Page noFooter>
        <Paragraph title="Hello World">
            <Text>There is quite a lot going on here</Text>
        </Paragraph>
        <Paragraph title="Helpful Buttons (which is NOT the title of the personal narrative, by the way)">
            <AppLink to={AppRoute.NARRATIVE} text='Personal Narrative' />
        </Paragraph>
    </Page>;
}