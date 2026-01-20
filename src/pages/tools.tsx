import React from "react";
import Page from "../core/Page";
import YAMLParser from "../core/YAMLParser";

import markup from './tools.yaml?raw';
import AppImage from "../widgets/AppImage";
import XKCDCredit from "./XKCDCredit";

export default function ToolsPage(): React.JSX.Element {
    return <Page>
        <YAMLParser markup={markup} figs={{
            linux: <AppImage
                src="https://imgs.xkcd.com/comics/cautionary.png"
                credit={<XKCDCredit />}
                attributionLink="https://xkcd.com/456/"
                caption="It has never gotten so bad that I need to compile a kernel (yet). Due to CPU architecture reasons, I have had to compile plenty of other stuff, though. I use Debian, and could probably hack my way around Ubuntu if it came to it."
            />,
            linux2: <AppImage
                src="https://imgs.xkcd.com/comics/linux_user_at_best_buy.png"
                credit={<XKCDCredit />}
                attributionLink="https://xkcd.com/272/"
                caption='Original Caption: "We actually stand around the antivirus displays with the Mac users just waiting for someone to ask."'
            />,
            git: <AppImage
                src="https://imgs.xkcd.com/comics/git.png"
                attributionLink='https://xkcd.com/1597'
                credit={<XKCDCredit />}
                caption="This is the same comic from the personal narrative."
            />
        }} />
    </Page>;
} 