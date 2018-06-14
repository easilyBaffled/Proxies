import { isA } from '../../proxies';

export default log =>
{
    // #### One Hell of a Logger
    const proxyProxyTrapLogger = ( obj = {} ) => new Proxy( obj, {
        get ( target, trapName, receiver )
        {
            return ( ...args ) =>
            { // args[0] is the targetObj
                let a = args.length > 2
                    ? args.slice( 1, args.length - 1 )
                    : args.slice( 1 );
                console.log( trapName, a.length ? a : '' );
                const res = obj[ trapName ] ? obj[ trapName ]( ...args ) : Reflect[ trapName ]( ...args );
                console.log( '// -> ', res );
                return isA.primitive(res) ? res : new Proxy( res, proxyProxyTrapLogger() );
            };
        }
    } );

    // #### So much to see
    const myObj = new Proxy( { a: 1, b: { c: 2 } }, proxyProxyTrapLogger() );

    console.group('Setting');
    myObj.a = 3;
    console.groupEnd();

    console.group('Delete');
    delete myObj.b.c;
    console.groupEnd();

    console.group('Get Keys');
    Object.keys( myObj );
    console.groupEnd();
};
