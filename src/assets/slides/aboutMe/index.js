import React from 'react';
import { Slide, Heading, Link, Text } from 'spectacle';
import Gravatar from 'react-gravatar';

const Flip = props => (
    <div style={ { display: 'inline-block', transform: 'rotate(-180deg)' } } { ...props } />
);

export default (
    <Slide>
        <Heading size={ 2 } fit caps>
            Danny Michaelis
        </Heading>
        <Link href='https://github.com/easilyBaffled'>
            <Text bold textColor='tertiary'>
                @easilyBaffled
            </Text>
        </Link>
    </Slide>
);
