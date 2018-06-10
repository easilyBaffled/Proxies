import { pipe } from 'ramda';
import { stripIndent } from 'common-tags/es/index';
import findLastIndex from 'lodash-es/findLastIndex';
// import prettier from 'prettier/standalone';
// import plugins from 'prettier/parser-babylon';

import { addLineNumbers } from '../../util';


const prettier = require( 'prettier/standalone' );
const plugins = [ require( 'prettier/parser-babylon' ) ];
console.log( plugins );
const splitLongString = ( str, length = 75 ) => 
{
    const index = findLastIndex( str.split( '' ), char => char === ' ', length );

    return [
        str.substring( 0, index ),
        str.substring( index )
    ];
};

const anyFunc = new Proxy( {}, {
    get ( _, name )
    {
        return ( ...args ) => target => target[ name ]( ...args );
    }
} );

const replace = ( regex, newSubstr ) => str => str.replace(  regex, newSubstr );

export default pipe(
    func => func.toString(),
    replace( /(.*=>\s*{\n?)/, '' ),
    replace( /}$/, '' ),
    stripIndent,
    replace( /Object\(__WEBPACK_IMPORTED_MODULE_.*\/\*\s*(.*)\s*\*\/]\)/g, '$1' ),
    replace( /__WEBPACK_IMPORTED_MODULE_.*\[.*\/* (.*) \*\/]/g, '$1' ),
    str => prettier.format( str, { printWidth: 75, tabWidth: 4, singleQuote: true, plugins } ),
    addLineNumbers,
    anyFunc.split( '\n' ),
    // arr => arr.reduce( ( acc, line ) =>
    //     line.length > 75
    //         ? [ ...acc, ...splitLongString( line ) ]
    //         : [ ...acc, line ]
    //     , [] )
);
