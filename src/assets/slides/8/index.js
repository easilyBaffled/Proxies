import React from 'react';
import { Heading, Slide } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';

import cupAndBalls2 from './cupAndBalls2.gif';

preloader( {
    cupAndBalls2
} );

export default (
    <Slide bgImage={cupAndBalls2.replace( '/', '' )}>
        <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
            It's Work
        </Heading>
    </Slide>
);
