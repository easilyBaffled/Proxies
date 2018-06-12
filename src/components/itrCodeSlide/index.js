import React from 'react';
import { CodePane, Slide } from 'spectacle';
import { arrayOf, number, func, oneOfType, string } from 'prop-types';

import funcToSlideContent from './funcToSlideContent';
import calculateSlideSections from './calculateSlideSections';

const increment = maxValue => ( { i } ) => ( { i: Math.min( i + 1, maxValue ) } );
const decrement = ( { i } ) => ( { i: Math.max( i - 1, 0 ) } );

const getFontSize = lineNum =>
{
    // return Math.max(
    //     Math.min( baseFontSize - lineNum + baseFontSize, 28 ),
    //     baseFontSize
    // );

    const index = lineNum > 7 ? 0
        : lineNum > 5 ? 1
            : lineNum > 3 ? 2
                : 3;
    const sizing = fontRhythm[ index ];
    sizing.fontSize = baseFontSize * parseFloat( sizing.fontSize );
    sizing.lineHeight = baseLineHeight * parseFloat( sizing.lineHeight );

    return sizing;
};


const baseFontSize = 18;
const baseLineHeight = 23;
const fontRhythm = [
    { // > 7
        fontSize: '1rem',
        lineHeight: '1.27777778rem',
        marginTop: '1.27777778rem',
        marginBottom: '0rem'
    },
    { // < 7, > 5
        fontSize: '1rem',
        lineHeight: '1.27777778rem',
        marginTop: '1.27777778rem',
        marginBottom: '0rem'
    },
    { // < 5, > 3
        fontSize: '1.61111111rem',
        lineHeight: '1.5862069rem',
        marginTop: '0.79310345rem',
        marginBottom: '0rem'
    },
    { // < 3
        fontSize: '2.61111111rem',
        lineHeight: '1.46808511rem',
        marginTop: '0.4893617rem',
        marginBottom: '0.4893617rem'
    }
    // {
    //     fontSize: '4.22222222rem',
    //     lineHeight: '1.21052632rem',
    //     marginTop: '0.30263158rem',
    //     marginBottom: '0.60526316rem'
    // }
];

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
      const trueSlideSections = calculateSlideSections(
          codeArr,
          this.props.slideSections
      );

      this.state = {
          i: 0,
          codeStr: codeArr.join( '\n' ).replace( /^(.*)\/\/ ####\s*(.*)$/gm, '$1' ),
          slideSections: trueSlideSections
      };

      this.boundInc = increment( this.props.slideSections.length - 1 );
  }

  calculateSlideMesurments ( start, end )
  {
      const snippetLength = end - start + 1;

      const { lineHeight, fontSize } = getFontSize( snippetLength );

      const lineSize = lineHeight * fontSize;

      const height = lineSize * snippetLength + lineSize / 2;

      const marginTop = ( start - 1 ) * -lineSize;

      return { height, marginTop, fontSize };
  }

  /** */
  render () 
  {
      const { codeStr, slideSections } = this.state;

      let [ start, end ] = slideSections[ this.state.i ];

      const {
          height,
          marginTop,
          fontSize
      } = this.calculateSlideMesurments( start, end );

      return (
          <Slide className='nice-code'>
              <CodePane
                  overflow='scroll'
                  height={ height }
                  textSize={ fontSize }
                  key='nice-code'
                  theme='light'
                  lang='javascript'
                  source={ codeStr }
                  maxWidth='70vw'
                  editorStyle={ {
                      marginTop: marginTop + 'px',
                      transition: 'margin 0.5s cubic-bezier(.25,.8,.25,1)',
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
