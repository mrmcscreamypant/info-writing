import React from 'react';
import './page.css';

export default function Page({ children }: React.PropsWithChildren): React.JSX.Element {
    return <>{children}</>/*<motion.div initial={{
        transform: "scale(1.0)"
    }} whileTap={{
        transform: "scale(0.95)"
    }} transition={{
        type: "spring"
    }} className="page">
        {children}
    </motion.div>*/;
}