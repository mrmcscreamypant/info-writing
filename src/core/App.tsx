import React from 'react';
import './app.css';
import AppRoutes from '../AppRoutes';
import "@radix-ui/themes/styles.css";
import Background from '../background/Background';

export function App(): React.JSX.Element {
    return <>
        <Background />
        <AppRoutes />
    </>;
}
