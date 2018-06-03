import React from 'react';
import { CodePane, Slide } from 'spectacle';
import { stripIndent } from 'common-tags';
import { pipe } from 'ramda';
import { arrayOf, string, number } from 'prop-types';

import { addLineNumbers } from '../../../util';
import Console from '../../../components/util/Console';

import trick from './trick';

const increment = maxValue => ( { i } ) => ( { i: Math.min( i + 1, maxValue ) } );
const decrement = ( { i } ) => ( { i: Math.max( i - 1, 0 ) } );

const formatCodeString = pipe(
    func => func.toString().replace( /^function\s*\(\)\s*{\n?/, '' ).replace( /}$/, '' ),
    stripIndent,
    addLineNumbers,
    str => str.replace( /Object\(__WEBPACK_IMPORTED_MODULE_.*\/\*\s*(.*)\s*\*\/]\)/g, '$1' )
);

const exampleCode = formatCodeString( trick );

const getFontSize = baseFontSize => lineNum => 
{
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

    boundInc = increment( this.props.slideLines.length - 1 );
    codeLines = this.props.code.split( '\n' );

    calcHeight = () => 
    {

    }

    render ()
    {
        const { slideLines, code } = this.props;
        const codeArr = code.split( '\n' );
        const [ start = 1, end = codeArr.length ] = slideLines[ this.state.i ];

        const snippetLength = end - start + 1;

        const lengthBasedTextSize = getFontSize( 16 )( snippetLength );

        const lineSize = ( 1.5 * lengthBasedTextSize );

        const height = lineSize * snippetLength;

        const marginTop =  ( start - 1 ) * -lineSize;

        console.log( { marginTop, marginLines: marginTop / lineSize } );

        return (
            <Console render={
                () => (
                    <React.Fragment>
                        <div className='nice-code'>
                            <CodePane overflow='scroll'
                                height={ height }
                                textSize={ lengthBasedTextSize }
                                key='nice-code'
                                theme='light'
                                lang='javascript'
                                source={ this.props.code /* displayStr.join( '\n' ) */ }
                                editorStyle={ {
                                    marginTop: marginTop + 'px',
                                    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                                    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                                    borderRadius: 6 + 'px',
                                    whiteSpace: 'pre'
                                } }
                            />
                            <div className='left' onClick={ () => this.setState( decrement ) } />
                            <div className='right' onClick={ () => this.setState( this.boundInc ) } />
                        </div>
                        <h3>{ start }-{ end }</h3>
                    </React.Fragment>
                )
            } />
        );
    }
}

export default (
    <Slide background='linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)'>
        <Ex code={ exampleCode } slideLines={ [ [], [ 1, 10 ], [ 13, 16 ], [ 18, 18 ], [ 20, 21 ], [ 40, 45 ] ] } />
    </Slide>
);
