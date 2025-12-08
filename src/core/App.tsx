import React from 'react';
import './app.css';
import AppRoutes from '../AppRoutes';
import { Theme } from '@radix-ui/themes';

export function App(): React.JSX.Element {
    return <Theme>
        <AppRoutes />
    </Theme>;
}
