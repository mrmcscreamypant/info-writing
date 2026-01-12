import React from 'react';
import './app.css';
import AppRoutes from '../AppRoutes';
import "@radix-ui/themes/styles.css";
import Background from '../background/Background';
import { useScroll, useSpring, useVelocity } from 'motion/react';
import { EngineHooks } from '../background/Engine';
import { Theme } from '@radix-ui/themes';
import { Location } from 'react-router';

export function App(): React.JSX.Element {
    const pageScrollRef = React.useRef(null) as React.RefObject<HTMLDivElement>;
    const { scrollYProgress, scrollY } = useScroll();

    const [currentPage, setCurrentPage] = React.useState<Location>();

    const engineHooks: EngineHooks = {
        scrollProgress: scrollYProgress,
        scrollVelocity: useVelocity(scrollY),
        scrollSpring: useSpring(useVelocity(scrollY)),
        currentPage
    };

    return <Theme appearance='dark' accentColor='teal'>
        <Background engineHooks={engineHooks} />
        <div id="css3d" ref={pageScrollRef}>
        </div>
        <div id="content">
            <AppRoutes setCurrentPage={setCurrentPage} />
        </div>
    </Theme>;
}
