import React from 'react';
import { Heading, Slide } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';

import cupAndBalls1 from './cupAndBalls1.gif';
import proxyScroll from './proxyScroll.mov';

preloader( {
    proxyScroll
} );

export default (
    <Slide bgImage={ proxyScroll.replace( '/', '' ) }>
        <Heading size={ 1 } fit caps lineHeight={ 1 } textColor='secondary'>
            It's Magic
        </Heading>
        <video controls='controls' width='800' height='600'
            name='Video Name' src={ proxyScroll } />
    </Slide>
);
