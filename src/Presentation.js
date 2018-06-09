
import React from 'react';
import { Slide, Deck } from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import * as urlBuilder from './assets/slides/urlBuilder';
import * as urlBuilderRedux from './assets/slides/urlBuilderRedux';
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
                urlBuilderRedux
            ]
        };
    }

    render () 
    {
        const { slides } = this.state;

        return (
            <Deck theme={theme}>
                {
                    slides.map( ( slideProps, index ) =>
                        <ItrCodeSlide removeSectionHeads key={index} { ...slideProps } />

                        // Array.isArray( slide )
                        //     ? slide.map( ( s, ix ) => React.cloneElement( s, { key: index + ' ' + ix } ) )
                        //     : React.cloneElement( slide, { key: index } )
                    )
                }
            </Deck>
        );
    }
}
