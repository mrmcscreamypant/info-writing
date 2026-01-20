import React from 'react';
import { HashRouter, Location, Route, Routes, useLocation } from 'react-router';
import Index from './pages';
import Narrative from './pages/Narrative';
import ProConPage from './pages/proCon';
import AboutMe from './pages/AboutMe';
import Tutorial from './pages/Tutorial';
import ToolsPage from './pages/tools';

export const enum AppRoute {
    INDEX = "/",
    NARRATIVE = "/narrative",
    PRO_CON = "/pro-con",
    ABOUT_ME = "/about-me",
    TUTORIAL = "/tutorial",
    TOOLS = "/tools"
}

type SetCurrentPageProps = { setCurrentPage: (value: Location) => void };

function LocationUpdater({ setCurrentPage }: SetCurrentPageProps): React.JSX.Element {
    const location = useLocation();
    React.useEffect(() => { setCurrentPage(location); }, [location]);
    return null;
}

export default function AppRoutes({ setCurrentPage }: SetCurrentPageProps): React.JSX.Element {
    return <HashRouter>
        <Routes>
            <Route path={AppRoute.INDEX} element={<Index />} />
            <Route path={AppRoute.NARRATIVE} element={<Narrative />} />
            <Route path={AppRoute.PRO_CON} element={<ProConPage />} />
            <Route path={AppRoute.ABOUT_ME} element={<AboutMe />} />
            <Route path={AppRoute.TUTORIAL} element={<Tutorial />} />
            <Route path={AppRoute.TOOLS} element={<ToolsPage />} />
        </Routes>
        <LocationUpdater setCurrentPage={setCurrentPage} />
    </HashRouter>;
}