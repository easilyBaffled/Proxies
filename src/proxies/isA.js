import isPrimitive from 'is-primitive';
import typeDetect from 'type-detect';

import addDefaultCase from './addDefaultCase';
const isA = new Proxy(
    {
    // Custom types
        primitive: isPrimitive
    },
    {
        get ( customTypes, name ) 
        {
            return target =>
                customTypes[ name ]
                    ? customTypes[ name ]( target )
                    : typeDetect( target ).toLowerCase() === name.toLowerCase();
        }
    }
);

// ====== Examples
isA.number( 0 );
// -> true
isA.array( [] );
// -> true
isA.object( {} );
// -> true
isA.Object( [] );
// -> false
isA.RegExp( /a-z/gi );
isA.Map( new Map() );
// -> true

// ====== There's never was a Proxy
isA.Proxy( isA );
// -> false
isA.Proxy( new Proxy( {}, {} ) );
// -> false

export const alt = addDefaultCase( name => target =>
    typeDetect( target ).toLowerCase() === name.toLowerCase()
)( {} );

export default isA;
