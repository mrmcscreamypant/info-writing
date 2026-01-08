import React from 'react';
import Page from '../core/Page';
import Paragraph from '../widgets/Paragraph';

export default function AboutMe(): React.JSX.Element {
    return <Page>
        <Paragraph title='About Me'>
            The mugshot is from school picture day. The version the school
            database had stored was covered in compression artifacts (but weirdly
            is high resolution? Never mind, I don't want to know...). Thankfully,
            the filter effects do a nice job of hiding them.
        </Paragraph>
        <Paragraph title="Why I picked programming">
            I am decently good at it. I learned Python from library books
            in 4th grade (not that I was any good at it, nor wrote good code)
            I am significantly less experienced than a lot of people who are
            good at it (the lack of formal education on more advanced
            math <i>really</i> does not help. More math homework is not the answer.
            (I taught myself rudimentary trig and piecewise notation in 7th
            grade)).
        </Paragraph>
    </Page>;
}