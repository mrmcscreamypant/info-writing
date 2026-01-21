import React from 'react';
import Page from '../core/Page';

import Paragraph from '../widgets/Paragraph';
import AppLink, { AppLinkDirection } from '../widgets/AppLink';
import { AppRoute } from '../AppRoutes';
import { Card, Flex, Text } from '@radix-ui/themes';

function SubpageCard({ title, route }: { title: string, route: AppRoute }): React.JSX.Element {
    return <Card style={{ width: "25%" }}>
        <h1>{title}</h1>
        <AppLink to={route} text="Read" direction={AppLinkDirection.FORWARD}></AppLink>
    </Card>;
}

function SubpagesList(): React.JSX.Element {
    return <Paragraph>
        <Flex gap="3">
            <SubpageCard title="Narrative" route={AppRoute.NARRATIVE} />
            <SubpageCard title="Pros/Cons Of Various Programming Languages" route={AppRoute.PRO_CON} />
            <SubpageCard title="Python Tutorial" route={AppRoute.TUTORIAL} />
            <SubpageCard title="Ranked Programming Tools" route={AppRoute.TOOLS} />
        </Flex>
    </Paragraph>;
}

export default function Index(): React.JSX.Element {
    return <Page noFooter>
        <Paragraph title="Hello World">
            <Text>There is quite a lot going on here</Text>
        </Paragraph>
        <SubpagesList />
    </Page>;
}