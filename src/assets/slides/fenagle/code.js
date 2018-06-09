import { isA } from '../../../proxies';

export default log =>
{
    // ####Fenagle
    const isEven = num => !( parseInt( num ) % 2 );

    function finagleSomeNumbers ( target )
    {
        return target
            .map( JSON.parse )
            .filter( isEven )
            .join( ' | ' );
    }

    // #### So delicate
    log( finagleSomeNumbers( [ '1', '2', '3', '4' ] ) );
    // -> 2 | 4
    log( finagleSomeNumbers( [] ) );
    // -> Uncaught ReferenceError: isEven is not defined
    log( finagleSomeNumbers( [ 1, 2, 3 ] ) );
    // -> Uncaught SyntaxError: Unexpected number
    log( finagleSomeNumbers( [ 'a', 'b' ] ) );
    // -> VM323:1 Uncaught SyntaxError: Unexpected token a in JSON at position 0

    // #### U-G-L-Y
    function fixedFinagleSomeNumbers ( target )
    {
        if ( !isA.array( target ) || !target.every( isA.string ) ) // 😑
            return '';

        const parsed = target.map( JSON.parse );

        return parsed.every( isA.number ) // 🤢
            ? parsed.filter( isEven ).join( ' | ' )
            : '';
    }
};
