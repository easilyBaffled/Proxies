
import React from 'react';
import { Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import * as urlBuilder from './assets/slides/urlBuilder';
import * as urlBuilderRedux from './assets/slides/urlBuilderRedux';
import * as defaultSummarize from './assets/slides/defaultSummarize';
import * as isA from './assets/slides/isA';
import * as fenagle from './assets/slides/fenagle';
import * as undefined from './assets/slides/undefined';
import * as revokeable from './assets/slides/private';
import * as trapLogger from './assets/slides/trapLogger';
import ItrCodeSlide from './components/itrCodeSlide';

import './App.css';

require( 'normalize.css' );


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
                urlBuilder,
                urlBuilderRedux,
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
                    slides.map( ( slideProps, index ) =>
                    {
                        return <ItrCodeSlide removeSectionHeads key={ index } { ...slideProps } />;
                    } )
                }
            </Deck>
        );
    }
}
