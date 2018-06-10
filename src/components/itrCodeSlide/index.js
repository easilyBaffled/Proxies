import React from 'react';
import { CodePane, Slide } from 'spectacle';
import { arrayOf, number, func, oneOfType, string } from 'prop-types';

import funcToSlideContent from './funcToSlideContent';
import calculateSlideSections from './calculateSlideSections';

const increment = maxValue => ( { i } ) => ( { i: Math.min( i + 1, maxValue ) } );
const decrement = ( { i } ) => ( { i: Math.max( i - 1, 0 ) } );


const getFontSize = baseFontSize => lineNum =>
{
    return Math.max(
        Math.min( baseFontSize - lineNum + baseFontSize, 28 ),
        baseFontSize
    );
};
/** */
export default class Ex extends React.Component
{
    static propTypes = {
        slideSections: arrayOf( arrayOf( oneOfType( [ number, string ] ) ) ),
        code: func
    };

    /** */
    constructor ( props )
    {
        super( props );

        const codeArr = funcToSlideContent( this.props.code );
        const trueSlideSections = calculateSlideSections( codeArr, this.props.slideSections );
        console.log( codeArr );
        this.state =  {
            i: 0,
            codeStr: codeArr.join( '\n' ).replace( /^(.*)\/\/ ####\s*(.*)$/gm, '$1' ),
            slideSections: trueSlideSections
        };

        this.boundInc = increment( this.props.slideSections.length - 1 );
    }

    calculateSlideMesurments ( start, end, fontSize = 16, lineHeight = 1.5 )
    {
        const snippetLength = end - start + 1;

        const lengthBasedTextSize = getFontSize( fontSize )( snippetLength );

        const lineSize = ( lineHeight * lengthBasedTextSize );

        const height = lineSize * snippetLength + lineSize / 2;

        const marginTop = ( start - 1 ) * -lineSize;

        return { height, marginTop, lengthBasedTextSize };
    }

    /** */
    render ()
    {
        const { codeStr, slideSections } = this.state;

        let [ start, end ] = slideSections[ this.state.i ];

        const { height, marginTop, lengthBasedTextSize } = this.calculateSlideMesurments( start, end );
        console.log( codeStr );
        return (
            <Slide className='nice-code'>
                <CodePane overflow='scroll'
                    height={ height }
                    textSize={ lengthBasedTextSize }
                    key='nice-code'
                    theme='light'
                    lang='javascript'
                    source={ codeStr }
                    maxWidth='70vw'
                    editorStyle={ {
                        marginTop: marginTop + 'px',
                        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                        borderRadius: 6 + 'px'
                        // whiteSpace: 'pre'
                    } }
                />
                <div className='left' onClick={ () => this.setState( decrement ) } />
                <div className='right' onClick={ () => this.setState( this.boundInc ) } />
            </Slide>
        );
    }
}
