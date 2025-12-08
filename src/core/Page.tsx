import React from 'react';
import './page.css';

import { Container, Theme } from '@radix-ui/themes';
import Background from '../background/Background';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
    return <Theme appearance='dark'>
        <Background />
        <Container >
            <div className='page'>
                {children}
            </div>
        </Container>
    </Theme>;
}