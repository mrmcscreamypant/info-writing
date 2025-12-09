import React from 'react';
import './page.css';

import { Container } from '@radix-ui/themes';
import { motion } from 'motion/react';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
    return <Container>
        <motion.div className='page'>
            {children}
        </motion.div>
    </Container >;
}