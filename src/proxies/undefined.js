import isA from './isA';

const Undefined = ( ...stack ) => new Proxy(
    () => '',
    {
        stack,
        get ( _, name, proxy ) {
            return isA.symbol( name )
                ? 'Proxy:Undefined' // Only time name isn't a string
                : name === 'stack'
                    ? this.stack
                    : (
                        this.stack.push( name ), // Update the source
                        proxy                   // Return what we will use
                    );
        },
        apply ( target, thisArg, argumentsList ) {
            return Undefined( ...this.stack, argumentsList ); //
        }
    }
);

const safe = obj =>
    new Proxy( obj, {
        get ( target, name ) {
            try {
                const res = Reflect.get( target, name );
                return !res
                    ? Undefined( name )
                    : ( isA.primitive( res ) || name === 'prototype' )
                        ? res // Can't wrap a primative, don't want to wrap prototype ...for now 😈
                        : safe( res );

            } catch ( e ) {
                return Undefined( e );
            }
        },
        apply ( ...args ) {
            try {
                return Reflect.apply( ...args );
            } catch ( e ) {
                return Undefined( e );
            }
        }
    } );

const isEven = num => !( parseInt( num ) % 2 );

function finagleSomeNumbers ( target ) {
    const result = safe( target )
        .map( JSON.parse )
        .filter( isEven )
        .join( ' | ' );

    return result === Undefined
        ? ( console.log( result.stack ), '' )
        : result;
}

finagleSomeNumbers( [ '1', '2', '3', '4' ] );
// -> 2 | 4

finagleSomeNumbers( {} );
// -> ''
finagleSomeNumbers( [] );
// -> ''
finagleSomeNumbers( [ 1, 2, 3 ] );
// -> ''
finagleSomeNumbers( [ 'a', 'b' ] );
// -> ''

export default safe;
