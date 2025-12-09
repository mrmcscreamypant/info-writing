import React from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import Index from './pages';
import Narrative from './pages/Narrative';

export const enum AppRoute {
    INDEX = "/",
    NARRATIVE = "narrative",
}

export default function AppRoutes(): React.JSX.Element {
    return <HashRouter>
        <Routes>
            <Route path={AppRoute.INDEX} element={<Index />} />
            <Route path={AppRoute.NARRATIVE} element={<Narrative />} />
        </Routes>
    </HashRouter>;
}