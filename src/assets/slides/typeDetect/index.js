import React from 'react';
import { Slide } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';

import videoScroll from './type-detectScroll.mov';

preloader( {
    videoScroll
} );

export default (
    <Slide className={"fullScreen"}>
        <video className='fullScreen background' name='MDN Proxy Docs' src={ videoScroll } autoPlay />
    </Slide>
);
