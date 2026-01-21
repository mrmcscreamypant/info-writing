import React from 'react';
import './page.css';

//import { ScrollRestoration } from 'react-router';
import { Container } from '@radix-ui/themes';
import { motion } from 'motion/react';
import Paragraph from '../widgets/Paragraph';
import AppLink, { AppLinkDirection } from '../widgets/AppLink';
import { AppRoute } from '../AppRoutes';

function Footer({ hidden }: { hidden: boolean }): React.JSX.Element {
    return <div className='footer'>
        {hidden ||
            <Paragraph>
                <AppLink to={AppRoute.INDEX} direction={AppLinkDirection.BACKWARD} text="Back to home" />
            </Paragraph>
        }
    </div>;
}

export default function Page({ children, noFooter }: { noFooter?: boolean } & React.PropsWithChildren): React.JSX.Element {
    const [loaded, setLoaded] = React.useState<boolean>(false);

    React.useEffect(() => { setLoaded(true); }, []);

    return <>
        {loaded ?
            <Container size={"3"}>
                <motion.div className='page'>
                    {children}
                </motion.div>
                <Footer hidden={noFooter} />
            </Container> :
            <>LOADING...</>
        }
    </>;
}