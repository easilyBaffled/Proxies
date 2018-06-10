/* eslint-disable no-new-wrappers */

// import typeDetect from 'type-detect';
const typeDetect = () => true;
const anArray = null;

export default log =>
{
    // #### Yeah but, I'm lazy and Objects are weird sometimes
    log( typeDetect( 'hello world' ) === 'string' );
    log( typeDetect( new String( 'hello' ) ) === 'String' ); // note - the object version has a capital S

    // check if anArray is not array of strings 😑
    if ( typeDetect( anArray ) !== 'Array' || !anArray.every( value => typeDetect( value ) === 'string' ) )
        return '';

    // #### isA - 9
    const isA = new Proxy( {}, {
        get ( target, prop )
        {
            return value => typeDetect( value ).toLowerCase() === prop.toLowerCase();
        }
    } );

    // #### How it's used
    isA.number( 0 );
    isA.array( [] );
    isA.object( {} );
    isA.Object( [] );
    isA.RegExp( /a-z/gi );
    isA.Map( new Map() );

    if ( isA.array( anArray ) || !anArray.every( isA.string ) )
        return '';

    // #### Just remember
    log( isA.Proxy( isA ) );
    // -> false

    log( isA.Proxy( new Proxy( {}, {} ) ) );
    // -> false
};
