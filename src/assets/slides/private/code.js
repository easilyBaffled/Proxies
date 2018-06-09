/* eslint-disable no-use-before-define*/

import { isA } from '../../../proxies';

export default log =>
{
    // #### How to Use
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

    // #### Nothing There
    log( Object.keys( hidden ) );
    // -> [ "a", "c" ]
    log( Object.values( hidden ) );
    // -> [ "1", { "e": 2 } ]
    log( hidden.hasOwnProperty( '_b' ) );
    // -> false
    log( hidden._b );
    // -> undefined
    log( hidden.c._d );
    // -> undefined

    // #### The Key
    const unlocked = hidden.unlock( '🔑' );
    log( unlocked );
    // {
    //    a: 1,
    //    _b: 2,
    //    c: {
    //        _d: 1,
    //        e: 2
    //    },
    //    _e: {
    //        f: 1
    //    }
    // },

    // #### The Proxy
    const protectProps = ( obj, lockString ) =>
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
            get ( target, prop )
            {
                return prop === 'unlock'
                    ? this.unlock
                    : isLocked( prop )
                        ? undefined
                        : wrap( Reflect.get( target, prop ) );
            },
            set ( target, prop, value )
            {
                return isLocked( prop )
                    ? true
                    : wrap( Reflect.set( target, prop, value ) );
            },
            has ( target, prop )
            {
                return isLocked( prop )
                    ? false
                    : wrap( Reflect.has( target, prop ) );
            },
            ownKeys ( target )
            {
                return Reflect.ownKeys( target )
                    .filter( key => !isLocked( key ) );
            },
            getOwnPropertyDescriptor ( target, prop )
            {
                return isLocked( prop )
                    ? undefined
                    : wrap( Reflect.getOwnPropertyDescriptor( target, prop ) );
            }
        } );

        return proxy;
    };
};
