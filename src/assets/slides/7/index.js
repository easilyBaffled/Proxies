import React from 'react';
import { Heading, Slide } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';

import cupAndBalls1 from './cupAndBalls1.gif';

preloader( {
    cupAndBalls1
} );

export default (
    <Slide bgImage={cupAndBalls1.replace( '/', '' )}>
        <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
            It's Magic
        </Heading>
    </Slide>
);
