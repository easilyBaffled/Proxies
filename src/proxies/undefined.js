import isA from './isA';

export const Undefined = new Proxy( () => '', {
    get: ( _, t, p ) =>
        isA.symbol( t ) ? 'Proxy:Undefined' : p,
    apply: () => Undefined
} );

const safe = obj => new Proxy( obj, {
    get ( target, name, proxy ) {
        const res = Reflect.get( target, name );
        return res
            ? isA.primative( res ) ? res : safe( res ) // <- returns a safe wrapped map, but does not catch the error
            : Undefined;
    },
    apply ( ...args )
    {
        try
        {
            return Reflect.apply( ...args );
        }
        catch ( e )
        {
            return Undefined;
        }
    }
} );
/*
const isEven = num => !( parseInt( num ) % 2 )
const double  = num => parseInt( num ) * 2

function finagleSomeNumbers( target )
{
    const result = safe( target )
        .map( JSON.parse )
        .filter( isEven )
        .map( double )
        .join('| ')

    return result === Undefined ? new Error( "Could Not Find Numbers" ) : result;
}

finagleSomeNumbers( [] )
finagleSomeNumbers( {} )
finagleSomeNumbers( () => "" )
*/
export default safe;
