/*******************
 tracePropAccess - you could do profiling as well
 *******************/
function tracePropAccess ( obj, propKeys ) {
    const propKeySet = new Set( propKeys );
    return new Proxy( obj, {
        get ( target, propKey, receiver ) {
            if ( propKeySet.has( propKey ) ) 
                console.log( 'GET ' + propKey );
            
            return Reflect.get( target, propKey, receiver );
        },
        set ( target, propKey, value, receiver ) {
            if ( propKeySet.has( propKey ) ) 
                console.log( 'SET ' + propKey + '=' + value );
            
            return Reflect.set( target, propKey, value, receiver );
        }
    } );
}

export default tracePropAccess;
