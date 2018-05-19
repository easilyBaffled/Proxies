/*******************
 Proxy a Proxy to see what the Proxy does.
 *******************/
export const proxyProxyTrapLogger = ( obj = {} ) => new Proxy( obj, {
    get ( target, trapName, receiver ) {
        return ( ...args ) => { // args[0] is the targetObj
            let a = args.length > 2
                ? args.slice( 1, args.length - 1 )
                : args.slice( 1 );
            console.log( trapName, a.length ? a : '' );
            const res = obj[ trapName ] ? obj[ trapName ]( ...args ) : Reflect[ trapName ]( ...args );
            console.log( '// -> ', res );
            return res;
        };
    }
} );

const trapLogger = ( obj = {} ) => new Proxy( obj, {
    get ( target, trapName, receiver ) {
        return ( ...args ) => { // args[0] is the targetObj
            let a = args.length > 2
                ? args.slice( 1, args.length - 1 )
                : args.slice( 1 );
            console.log( trapName, a.length ? a : '' );
            const res = Reflect[ trapName ]( ...args );
            console.log( '// -> ', res );
            return res;
        };
    }
} );

export default trapLogger;
