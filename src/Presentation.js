
import React from 'react';
import { Slide, Deck, Heading, Text, List, ListItem, BlockQuote, Quote, Cite } from 'spectacle';
import CodeSlide from 'spectacle-code-slide';
import preloader from 'spectacle/lib/utils/preloader';
import createTheme from 'spectacle/lib/themes/default';
import x from 'raw-loader!./assets/examples/undefined.example'; // eslint-disable-line import/no-webpack-loader-syntax

import cupAndBalls1Gif from './assets/images/cupAndBalls1.gif';



require( 'normalize.css' );

preloader( {
    cupAndBalls1Gif
} );

const theme = createTheme( {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quarternary: '#CECECE'
}, {
    primary: 'Montserrat',
    secondary: 'Helvetica'
} );



console.log( x );

export default () =>
    <Deck transition={[ 'zoom', 'slide' ]} transitionDuration={500} theme={theme}>
        <Slide transition={[ 'zoom' ]} bgColor='primary'>
            <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
                Spectacle Boilerplate
            </Heading>
            <Text margin='10px 0 0' textColor='tertiary' size={1} fit bold>
                open the presentation/index.js file to get started
            </Text>
        </Slide>
        <Slide transition={[ 'fade' ]} bgColor='tertiary'>
            <Heading size={6} textColor='primary' caps>Typography</Heading>
            <Heading size={1} textColor='secondary'>Heading 1</Heading>
            <Heading size={2} textColor='secondary'>Heading 2</Heading>
            <Heading size={3} textColor='secondary'>Heading 3</Heading>
            <Heading size={4} textColor='secondary'>Heading 4</Heading>
            <Heading size={5} textColor='secondary'>Heading 5</Heading>
            <Text size={6} textColor='secondary'>Standard text</Text>
        </Slide>
        <Slide transition={[ 'fade' ]} bgColor='primary' textColor='tertiary'>
            <Heading size={6} textColor='secondary' caps>Standard List</Heading>
            <List>
                <ListItem>Item 1</ListItem>
                <ListItem>Item 2</ListItem>
                <ListItem>Item 3</ListItem>
                <ListItem>Item 4</ListItem>
            </List>
        </Slide>
        <Slide transition={[ 'fade' ]} bgColor='secondary' textColor='primary'>
            <BlockQuote>
                <Quote>Example Quote</Quote>
                <Cite>Author</Cite>
            </BlockQuote>
        </Slide>
        <Slide bgColor='tertiary'>
            <CodeSlide
                transition={[]}
                lang='js'
                code={require( 'raw-loader!./assets/examples/undefined.example' )} // eslint-disable-line import/no-webpack-loader-syntax
                ranges={[
                    { loc: [ 0, 29 ], title: 'Walking through some code' },
                    { loc: [ 0, 1 ], title: 'The Beginning' },
                    { loc: [ 1, 2 ] },
                    { loc: [ 1, 2 ], note: 'Heres a note!' },
                    { loc: [ 2, 3 ] },
                    { loc: [ 4, 7 ], image: cupAndBalls1Gif },
                    { loc: [ 8, 10 ] }
                ]} />
        </Slide>
    </Deck>;
