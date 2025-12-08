import React from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import Index from './pages';

export const enum AppRoute {
    INDEX = "/",
    ABOUT = "about"
}

export default function AppRoutes(): React.JSX.Element {
    return <HashRouter>
        <Routes>
            <Route path={AppRoute.INDEX} element={<Index />} />
            <Route path={AppRoute.ABOUT} element={<h1>About</h1>} />
        </Routes>
    </HashRouter>;
}