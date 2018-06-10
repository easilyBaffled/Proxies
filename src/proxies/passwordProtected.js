/*eslint no-unused-expressions: 0*/

import isA from './isA';

// var protect = obj => {
//     const { proxy, revoke } = Proxy.revocable( obj, {
//         unlock: str =>
//             str === '🔑'
//                 ? ( revoke(), obj )
//                 : '🔒',
//         get ( target, name ) {
//             return name !== 'unlock' ? undefined : this.unlock;
//         }
//     } );
//
//     return proxy;
// };

/*******************
 Private props
 *******************/
export const protectProps = ( obj, lockString ) => 
{
    const isLocked = str => isA.string( str ) ? str.startsWith( lockString ) : false;

    const wrap = child =>
        typeof child === 'object' || typeof child === 'function'
            ? protectProps( child, lockString )
            : child;

    const { proxy, revoke } =  Proxy.revocable( obj, {
        unlock: str =>
            str === '🔑'
                ? ( revoke(), obj )
                : '🔒',
        get ( target, name )
        {
            return name === 'unlock'
                ? this.unlock
                : isLocked( name )
                    ? undefined
                    : wrap( Reflect.get( target, name ) );
        },
        set ( target, name, value )
        {
            return isLocked( name )
                ? true
                : wrap( Reflect.set( target, name, value ) );
        },
        has ( target, name )
        {
            return isLocked( name )
                ? false
                : wrap( Reflect.has( target, name ) );
        },
        ownKeys ( target )
        {
            return Reflect.ownKeys( target )
                .filter( key => !isLocked( key ) );
        },
        getOwnPropertyDescriptor ( target, name )
        {
            return isLocked( name )
                ? undefined
                : wrap( Reflect.getOwnPropertyDescriptor( target, name ) );
        }
    } );

    return proxy;
};

const hidden = protectProps(
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
const unlocked = hidden.unlock( '🔑' );
// log( unlocked );
