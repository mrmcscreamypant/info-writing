import React from 'react';
import './page.css';

import { Container, Theme } from '@radix-ui/themes';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
    return <Theme appearance='dark'>
        <Container >
            <div className='page'>
                {children}
            </div>
        </Container>
    </Theme>;
}