import React from 'react';
import { NavLink } from 'react-router';
import { AppRoute } from '../AppRoutes';
import { Button } from '@radix-ui/themes';

export default function AppLink({ to, text }: { to: AppRoute, text: string }): React.JSX.Element {
    return <NavLink to={to}>
        <Button>{text}</Button>
    </NavLink>;
}