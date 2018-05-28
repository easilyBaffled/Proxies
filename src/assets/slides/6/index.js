import React from 'react';
import { CodePane, Slide } from 'spectacle';

import { addLineNumbers } from '../../../util';

import x from './undefined';

export default (
    <Slide bgColor='tertiary'>
        <CodePane
            lang='javascript'
            source={addLineNumbers( x )}
            // ranges={[
            //     { loc: [ 0, 29 ], title: 'Walking through some code' },
            //     { loc: [ 0, 1 ], title: 'The Beginning' },
            //     { loc: [ 1, 2 ] },
            //     { loc: [ 1, 2 ], note: 'Heres a note!' },
            //     { loc: [ 2, 3 ] },
            //     { loc: [ 4, 7 ], image: cupAndBalls1Gif },
            //     { loc: [ 8, 10 ] }
            // ]}
        />
    </Slide>
);
