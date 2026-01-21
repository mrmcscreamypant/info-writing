import React from 'react';
import { NavLink } from 'react-router';
import { AppRoute } from '../AppRoutes';
import { Button, Text } from '@radix-ui/themes';
import * as Icons from '@radix-ui/react-icons';

export const enum AppLinkDirection {
    NONE = 'none',
    FORWARD = 'forward',
    BACKWARD = 'backward'
}

const AppLinkDirectionMap: { [key in AppLinkDirection]: React.JSX.Element } = {
    none: null,
    forward: <Icons.ArrowRightIcon />,
    backward: <Icons.ArrowLeftIcon />
};

type LinkDirection = keyof typeof AppLinkDirectionMap;

function iconFromLinkDirection(direction: LinkDirection): typeof AppLinkDirectionMap[LinkDirection] {
    return AppLinkDirectionMap[direction];
}

export default function AppLink({ to, text, direction = AppLinkDirection.NONE }: { to: AppRoute, text: string, direction?: LinkDirection }): React.JSX.Element {
    return <NavLink to={to}>
        <Button variant='soft'>
            {direction == AppLinkDirection.BACKWARD && iconFromLinkDirection(direction)}
            <Text>{text}</Text>
            {direction == AppLinkDirection.FORWARD && iconFromLinkDirection(direction)}
        </Button>
    </NavLink>;
}