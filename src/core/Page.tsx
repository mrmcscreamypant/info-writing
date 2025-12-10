import React from 'react';
import './page.css';

//import { ScrollRestoration } from 'react-router';
import { Container } from '@radix-ui/themes';
import { motion } from 'motion/react';

function Footer(): React.JSX.Element {
    return <>Footer</>;
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
                {noFooter || <Footer />}
            </Container> :
            <>LOADING...</>
        }
    </>;
}