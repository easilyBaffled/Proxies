import { pipe } from 'ramda';
import { stripIndent } from 'common-tags/es/index';
import findIndex from 'lodash-es/findIndex';


import { addLineNumbers } from '../../util';

const splitLongString = ( str, length = 75 ) => 
{
    const index = findIndex( str.split( '' ), char => char === ' ', length );
    console.log( str, index );
    return [
        str.substring( 0, index ),
        str.substring( index )
    ];
};

export default pipe(
    func => func.toString().replace( /(.*=>\s*{\n?)/, '' ).replace( /}$/, '' ),
    stripIndent,
    addLineNumbers,
    str => str.replace( /Object\(__WEBPACK_IMPORTED_MODULE_.*\/\*\s*(.*)\s*\*\/]\)/g, '$1' ),
    str => str.split( '\n' ),
    arr => arr.reduce( ( acc, line ) =>
        line.length > 75
            ? [ ...acc, ...splitLongString( line ) ]
            : [ ...acc, line ]
        , [] )
);
