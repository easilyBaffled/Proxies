
import React from 'react';
import { Image, Slide, Deck, Heading, Text, List, ListItem, BlockQuote, Quote, Cite, CodePane } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';
import createTheme from 'spectacle/lib/themes/default';

// import slides from './assets/slides';

const slides = [
    import( './assets/slides/1' ),
    import( './assets/slides/2' ),
    import( './assets/slides/3' ),
    import( './assets/slides/4' ),
    import( './assets/slides/5' ),
    import( './assets/slides/6' ),
    import( './assets/slides/7' ),
    import( './assets/slides/8' ),
    import( './assets/slides/9' )
];

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

export const alt =  () =>
    <Deck transition={[ 'slide' ]} transitionDuration={500} theme={theme} />;

export default class Presentation extends React.Component
{
    constructor ( props ) 
    {
        super( props );

        this.state = {
            slides: Array( slides.length ).fill( <Slide key='loading' /> )
        };
    }

    componentDidMount ()
    {
        const importedSlides = [];
        Promise.all( slides ).then( ( slidesImportsResolved ) =>
        {
            slidesImportsResolved.forEach( ( slide ) =>
            {
                importedSlides.push( slide.default );
            } );
            this.setState( { slides: importedSlides } );
        } );
    }

    render () 
    {
        const { slides } = this.state;
        return (
            <Deck transition={[ 'zoom', 'slide' ]} transitionDuration={500} theme={theme}>
                {
                    slides.map( ( slide, index ) => 
                    {
                        return React.cloneElement( slide, { key: index } );
                    } )
                }
            </Deck>
        );
    }
}
