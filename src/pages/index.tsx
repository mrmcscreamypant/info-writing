import React from 'react';
import { NavLink } from 'react-router';
import { AppRoute } from '../AppRoutes';

export default function Index(): React.JSX.Element {
    return <NavLink to={AppRoute.ABOUT}>Hello World</NavLink>;
}