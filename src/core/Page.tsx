import React from 'react';
import './page.css';

import { Container, Theme } from '@radix-ui/themes';
import Background from '../background/Background';
import { useScroll, useSpring, useVelocity } from 'motion/react';
import { EngineHooks } from '../background/Engine';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
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
        <Container ref={pageScrollRef} >
            <div className='page'>
                {children}
            </div>
        </Container>
    </Theme>;
}