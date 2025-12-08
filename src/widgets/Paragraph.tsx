import { Box, Heading, Section, Text } from '@radix-ui/themes';
import React from 'react';
import './paragraph.css';

import { motion, transformValue, useScroll, useSpring, useVelocity } from 'motion/react';

export default function Paragraph({ title, children }: { title?: string } & React.PropsWithChildren): React.JSX.Element {
    const paragraphRef = React.useRef(null) as React.RefObject<HTMLDivElement>;
    const { scrollYProgress } = useScroll({
        target: paragraphRef,
        offset: ["end end", "start start"]
    });

    return <motion.div ref={paragraphRef} style={{
        scaleX: transformValue(() => (Math.sin((scrollYProgress.get()) * Math.PI)+2) / 3),
        scaleY: transformValue(() => (Math.sin((scrollYProgress.get()) * Math.PI)+2) / 3)
    }}>
        <Section>
            {title ? <Heading color="teal">{title}</Heading> : null}
            <Box>
                <Text>
                    {children}
                </Text>
            </Box>
        </Section>
    </motion.div>;
}