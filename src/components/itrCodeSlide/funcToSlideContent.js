import { pipe } from 'ramda';
import { stripIndent } from 'common-tags/es/index';

import { addLineNumbers } from '../../util';

export default pipe(
    func => func.toString().replace( /^function\s*\(.*\)\s*{\n?/, '' ).replace( /}$/, '' ),
    stripIndent,
    addLineNumbers,
    str => str.replace( /Object\(__WEBPACK_IMPORTED_MODULE_.*\/\*\s*(.*)\s*\*\/]\)/g, '$1' ),
    str => str.split( '\n' )
);
