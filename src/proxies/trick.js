import { pipe } from 'ramda';

import { addDefaultCase, autoBind, chaining } from './index';

console.log( addDefaultCase.toString() );

export default pipe(
    autoBind,
    addDefaultCase( ( name, t ) => () => t.addParam( name ) ),
    chaining,
    o => new Proxy( o, { has: () => false, getOwnPropertyDescriptor: () => undefined } ),
);
