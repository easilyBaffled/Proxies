import React from 'react';
import { CodePane, Code, Slide } from 'spectacle';
import { stripIndent } from 'common-tags';
import { pipe } from 'ramda';
import { arrayOf, string, number } from 'prop-types';

import { addLineNumbers } from '../../../util';

import trick from './trick';

const increment = maxValue => ( { i } ) => ( { i: Math.min( i + 1, maxValue ) } );
const decrement = ( { i } ) => ( { i: Math.max( i - 1, 0 ) } );

const formatCodeString = pipe(
    func => func.toString().replace( /^function\s*\(\)\s*{\n?/, '' ).replace( /}$/, '' ),
    stripIndent,
    addLineNumbers
);

const exampleCode = formatCodeString( trick );

const getFontSize = baseFontSize => lineNum => 
{
    console.log( baseFontSize - lineNum + baseFontSize );
    return Math.max(
        Math.min( baseFontSize - lineNum + baseFontSize, 32 ),
        baseFontSize
    );
};

class Ex extends React.Component
{
    static propTypes = {
        slideLines: arrayOf( arrayOf( number ) ),
        code: string
    };

    state =  {
        i: 0
    };

    incrmnt = increment( this.props.slideLines.length - 1 );
    codeLines = this.props.code.split( '\n' );

    render ()
    {
        const { slideLines } = this.props;

        const [ start = 1, end ] = slideLines[ this.state.i ];
        const displayStr = this.codeLines.slice( start - 1, end );
        const lengthBasedTextSize = getFontSize( 16 )( displayStr.length - 1 );
        console.log( { lengthBasedTextSize } );
        return (
            <div className='nice-code'>
                <CodePane
                    textSize={ lengthBasedTextSize }
                    key='nice-code'
                    theme='light'
                    transition={ [ 'slide' ] }
                    transitionDuration={ 800 }
                    lang='javascript'
                    source={ displayStr.join( '\n' ) }
                />
                <div className='left' onClick={ () => this.setState( decrement ) } />
                <div className='right' onClick={ () => this.setState( this.incrmnt ) } />
            </div>
        );
    }
};

export default (
    <Slide background='linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)'>
        <Ex code={ exampleCode } slideLines={ [ [], [ 1, 10 ], [ 13, 16 ], [ 18, 18 ], [ 20, 21 ] ] } />
    </Slide>
);
