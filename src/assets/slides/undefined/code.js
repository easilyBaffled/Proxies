import isEqual from 'lodash-es/isEqual';

import { isA } from '../../../proxies';

export default log =>
{
    // #### A masterpiece
    const Undefined = ( ...stack ) => new Proxy( () => '',
        {
            stack,
            get ( target, prop, proxy )
            {
                return prop === 'stack'
                    ? this.stack
                    : prop === 'isUndefined' ? true
                    : (
                        this.stack.concat( prop ),
                        proxy
                    );
            },
            apply ( target, thisArg, argumentsList )
            {
                return Undefined( ...this.stack, argumentsList );
            }
        }
    );

    // #### Safe ...if you must
    const safe = obj =>
        new Proxy( obj, {
            get ( target, name )
            {
                try
                {
                    const res = Reflect.get( target, name );
                    return !res
                        ? Undefined( name )
                        : ( isA.primitive( res ) || name === 'prototype' )
                            ? res
                            : safe( res );

                }
                catch ( e )
                {
                    return Undefined( e );
                }
            },
            apply ( ...args )
            {
                try
                {
                    return Reflect.apply( ...args );
                }
                catch ( e )
                {
                    return Undefined( e );
                }
            }
        } );

    // #### so much better
    const isEven = num => !( parseInt( num ) % 2 );

    function finagleSomeNumbers ( target )
    {
        const result = safe( target )
            .map( JSON.parse )
            .filter( isEven )
            .join( ' | ' );

        return result.isUndefined
            ? ( console.log( result.stack ), '' )
            : result;
    }

    // #### safe
    finagleSomeNumbers( [ '1', '2', '3', '4' ] );
    log( finagleSomeNumbers( {} ) );
    // -> ''
    log( finagleSomeNumbers( [] ) );
    // -> ''
    log( finagleSomeNumbers( [ 1, 2, 3 ] ) );
    // -> ''
    log( finagleSomeNumbers( [ 'a', 'b' ] ) );
    // -> ''
};
