import React from 'react';
import { HashRouter, Location, Route, Routes, useLocation } from 'react-router';
import Index from './pages';
import Narrative from './pages/Narrative';

export const enum AppRoute {
    INDEX = "/",
    NARRATIVE = "/narrative",
    TESTING = "/testing"
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
            <Route path={AppRoute.TESTING} element={<Index />} />
        </Routes>
        <LocationUpdater setCurrentPage={setCurrentPage} />
    </HashRouter>;
}