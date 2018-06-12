import { pipe } from 'ramda';
import { stripIndent } from 'common-tags/es/index';

import { addLineNumbers } from '../../util';

const prettier = require( 'prettier/standalone' );
const plugins = [ require( 'prettier/parser-babylon' ) ];

const anyFunc = new Proxy(
    {},
    {
        get ( _, name ) 
        {
            return ( ...args ) => target => target[ name ]( ...args );
        }
    }
);

const replace = ( regex, newSubstr ) => str => str.replace( regex, newSubstr );

export default pipe(
    func => func.toString(),
    replace( /(.*=>\s*{\n?)/, '' ),
    replace( /}$/, '' ),
    stripIndent,
    replace( /Object\(__WEBPACK_IMPORTED_MODULE_.*\/\*\s*(.*)\s*\*\/]\)/g, '$1' ),
    replace( /__WEBPACK_IMPORTED_MODULE_.*\[.*\/* (.*) \*\/]/g, '$1' ),
    str =>
        prettier.format( str, {
            printWidth: 75,
            tabWidth: 4,
            singleQuote: true,
            plugins,
            parser: 'babylon'
        } ),
    addLineNumbers,
    anyFunc.split( '\n' )
);
