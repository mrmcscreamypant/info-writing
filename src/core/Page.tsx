import React from 'react';
import './page.css';

//import { ScrollRestoration } from 'react-router';
import { Container } from '@radix-ui/themes';
import { motion } from 'motion/react';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
    return <>
        {/*<ScrollRestoration />*/}
        <Container size={"3"}>
            <motion.div className='page'>
                {children}
            </motion.div>
        </Container>
    </>;
}