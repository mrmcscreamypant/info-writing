import React from 'react';
import './page.css';

import { Container } from '@radix-ui/themes';
import { motion } from 'motion/react';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
    return <motion.div key="page" exit={{ opacity: 0 }} className='page'>
        <Container>
            {children}
        </Container>
    </motion.div>;
}