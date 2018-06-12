import React from 'react';
import { Slide, Heading } from 'spectacle';

const Flip = props => (
    <div
        style={ { display: 'inline-block', transform: 'rotate(-180deg)' } }
        { ...props }
    />
);

export default (
    <Slide>
        <Heading fit caps lineHeight={ 1 } textColor='black'>
      Do <Flip>This</Flip> To <Flip>Javascript</Flip>
        </Heading>
    </Slide>
);
