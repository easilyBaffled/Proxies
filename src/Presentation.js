
import React from 'react';
import { Image, Slide, Deck, Heading, Text, List, ListItem, BlockQuote, Quote, Cite, CodePane } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';
import createTheme from 'spectacle/lib/themes/default';
import { stripIndent } from 'common-tags';

import x from './assets/examples/undefined';
import cupAndBalls1 from './assets/images/cupAndBalls1.gif';
import cupAndBalls2 from './assets/images/cupAndBalls2.gif';
import { trick } from './proxies';

const addLineNumbers = str => str.trim().split( '\n' ).map( ( line, lineNumber ) => `${lineNumber + 1}. ${line}` ).join( '\n' );


require( 'normalize.css' );

const images = {
    cupAndBalls1,
    cupAndBalls2
};

preloader( {
    images
} );

const Trick = () =>
{
    const urlBuilder = {
        url: [],
        addParam ( str )
        {
            this.url.push( str );
        },
        getUrl ()
        {
            return '/' + this.url.join( '/' );
        }
    };

    const builder = trick( urlBuilder );
    // ===== The Pledge
    console.log( Object.keys( builder ) );
    builder.addParam( 'a' );
    builder.addParam( 'b' );
    console.log( builder.getUrl() );
    // ====== The Turn
    console.log( builder.c );  // -> undefined ?
    // ====== The Turn Around
    console.log( builder.c );  // -> undefined ?
    console.log( builder.d().e().f().getUrl() );
    // ====== The Prestige
    console.log( 'd' in builder, 'e' in builder );
    console.log( 'addParam' in builder );
    console.log( Object.getOwnPropertyDescriptor( builder, 'url' ) );
    return null;
};

const theme = createTheme( {
    primary: 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    secondary: 'linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)',
    tertiary: 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
    quarternary: 'red'
}, {
    primary: 'Montserrat',
    secondary: 'Helvetica'
} );

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
        <Slide bgImage={images.cupAndBalls1.replace( '/', '' )}>
            <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
                It's Magic
            </Heading>
        </Slide>
        <Slide bgImage={images.cupAndBalls2.replace( '/', '' )}>
            <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
                It's Work
            </Heading>
        </Slide>
        <Slide background='linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)'>
            <CodePane
                lang='javascript'
                source={addLineNumbers( stripIndent`
                    const urlBuilder = {
                        url: [],
                        addParam ( str )
                        {
                            this.url.push( str );
                        },
                        getUrl ()
                        {
                            return '/' + this.url.join( '/' );
                        }
                    };

                    const builder = trick( urlBuilder );
                    // ===== The Pledge
                    console.log( Object.keys( builder ) );
                    builder.addParam( 'a' );
                    builder.addParam( 'b' );
                    console.log( builder.getUrl() );
                    // ====== The Turn
                    console.log( builder.c );  // -> undefined ?
                    // ====== The Turn Around
                    console.log( builder.c );  // -> undefined ?
                    console.log( builder.d().e().f().getUrl() );
                    // ====== The Prestige
                    console.log( 'd' in builder, 'e' in builder );
                    console.log( 'addParam' in builder );
                    console.log( Object.getOwnPropertyDescriptor( builder, 'url' ) );
                ` )}
            />
            <Trick />
        </Slide>
    </Deck>;
