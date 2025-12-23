import { Box, Heading, Section, Separator } from '@radix-ui/themes';
import React from 'react';
import './paragraph.css';

import { motion, transformValue, useScroll, useMotionValueEvent } from 'motion/react';

export default function Paragraph({ title, children }: { title?: string } & React.PropsWithChildren): React.JSX.Element {
    const paragraphRef = React.useRef(null) as React.RefObject<HTMLDivElement>;
    const { scrollYProgress } = useScroll({
        target: paragraphRef,
        offset: ['center start', "center end"]
    });

    const anim = transformValue(() => Math.sqrt(Math.sin(scrollYProgress.get() * Math.PI)));

    return <motion.div ref={paragraphRef} style={{
        transform: transformValue(() => `scale(1,${anim.get()})`),
        opacity: anim,
        visibility: transformValue(() => scrollYProgress.get() > 0 ? 'visible' : 'hidden')
    }}>
        <Section size={"1"}>
            {
                title && <>
                    <Heading color="teal">{title}</Heading>
                    <Separator my="3" size="4" />
                </>
            }
            <Box className="paragraph">
                {children}
            </Box>
        </Section>
    </motion.div>;
}