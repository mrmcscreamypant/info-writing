import React from 'react';
import './app.css';
import AppRoutes from '../AppRoutes';
import "@radix-ui/themes/styles.css";
import Background from '../background/Background';
import { AnimatePresence, useScroll, useVelocity } from 'motion/react';
import { EngineHooks } from '../background/Engine';
import { Theme } from '@radix-ui/themes';

export function App(): React.JSX.Element {
    const pageScrollRef = React.useRef(null) as React.RefObject<HTMLDivElement>;
    const { scrollYProgress, scrollY } = useScroll({
        target: pageScrollRef
    });

    const engineHooks: EngineHooks = {
        scrollProgress: scrollYProgress,
        scrollVelocity: useVelocity(scrollY)
    };

    return <Theme appearance='dark'>
        <Background engineHooks={engineHooks} />
        <div id="content" ref={pageScrollRef}>
            <AnimatePresence>
            <AppRoutes />
            </AnimatePresence>
        </div>
    </Theme>;
}
