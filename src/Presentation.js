
import React from 'react';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import typeDetect from 'type-detect';

import * as urlBuilder from './slides/urlBuilder';
import * as urlBuilderRedux from './slides/urlBuilderRedux';
import * as defaultSummarize from './slides/defaultSummarize';
import * as isA from './slides/isA';
import * as fenagle from './slides/fenagle';
import * as undefined from './slides/undefined';
import * as revokeable from './slides/private';
import * as trapLogger from './slides/trapLogger';
import mdnProxy from './slides/mdnProxy';
import typeDetectVideo from './slides/typeDetect';
import aboutMe from './slides/aboutMe';
import titles from './slides/title';
import ItrCodeSlide from './components/itrCodeSlide';

import './App.css';

require( 'normalize.css' );
console.log( mdnProxy );

const theme = createTheme( {
    primary: 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    secondary: 'linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)',
    tertiary: 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    quarternary: 'red'
}, {
    primary: 'Montserrat',
    secondary: 'Helvetica'
} );

export default class Presentation extends React.Component
{
    constructor ( props ) 
    {
        super( props );

        this.state = {
            slides: [
                titles,
                aboutMe,
                urlBuilder,
                mdnProxy,
                urlBuilderRedux,
                typeDetectVideo,
                isA,
                defaultSummarize,
                fenagle,
                undefined,
                revokeable,
                trapLogger
            ]
        };
    }

    render () 
    {
        const { slides } = this.state;

        return (
            <Deck theme={ theme }>
                {
                    slides.map( ( slide, index ) =>
                        slide.code && slide.slideSections
                            ? <ItrCodeSlide removeSectionHeads key={ index } { ...slide } />
                            : React.cloneElement( slide, { key: index } )
                    )
                }
            </Deck>
        );
    }
}
