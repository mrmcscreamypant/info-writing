import { Box, Heading, Section, Separator } from '@radix-ui/themes';
import React from 'react';
import './paragraph.css';

import { motion, transformValue, useScroll, useMotionValueEvent } from 'motion/react';

export default function Paragraph({ title, children }: { title?: string } & React.PropsWithChildren): React.JSX.Element {
    return <Section size={"1"}>
        {
            title && <>
                <Heading color="teal">{title}</Heading>
                <Separator my="3" size="4" />
            </>
        }
        <Box className="paragraph">
            {children}
        </Box>
    </Section>;
}