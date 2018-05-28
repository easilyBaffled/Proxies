import React from 'react';
import { BlockQuote, Slide, Quote, Cite } from 'spectacle';

export default (
    <Slide transition={[ 'fade' ]} bgColor='secondary' textColor='primary'>
        <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
        </BlockQuote>
    </Slide>
);
