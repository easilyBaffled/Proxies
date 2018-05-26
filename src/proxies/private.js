/*eslint no-unused-expressions: 0*/

import isA from './isA';

/*******************
 Private props
 *******************/
const hideProps = ( obj, lockString ) => 
{
    const isLocked = str => isA.string( str ) ? str.startsWith( lockString ) : false;
    const wrap = child =>
        typeof child === 'object' || typeof child === 'function'
            ? hideProps( child, lockString )
            : child;
    return new Proxy( obj, {
        get ( target, key )
        {
            return isLocked( key )
                ? undefined
                : wrap( Reflect.get( target, key ) );
        },
        set ( target, key, value )
        {
            return isLocked( key )
                ? true
                : wrap( Reflect.set( target, key, value ) );
        },
        has ( target, key )
        {
            return isLocked( key )
                ? false
                : wrap( Reflect.has( target, key ) );
        },
        ownKeys ( target )
        {
            return Reflect.ownKeys( target )
                .filter( key => !isLocked( key ) );
        },
        getOwnPropertyDescriptor ( target, key )
        {
            return isLocked( key )
                ? undefined
                : wrap( Reflect.getOwnPropertyDescriptor( target, key ) );
        }
    } );
};

const hidden = hideProps(
    {
        a: 1,
        _b: 2,
        c: {
            _d: 1,
            e: 2
        },
        _e: {
            f: 1
        }
    },
    '_'
);


Object.keys( hidden );
// -> [ "a", "c" ]
Object.values( hidden );
// -> [ "1", { "e": 2 } ]
hidden.hasOwnProperty( '_b' );
// -> false
hidden._b;
// -> undefined
hidden.c._d;
// -> undefined
