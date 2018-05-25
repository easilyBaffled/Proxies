/*
* Subscriber
* */
const observable = obj => new Proxy( obj, {
    subscribers: [],
    subscribe ( ...func ) {
        this.subscribers = this.subscribers.concat( func );
    },
    get ( target, name )
    {
        return name === 'subscribe'
            ? ( ...func ) => this.subscribers = this.subscribers.concat( func )
            : name === 'subscribers' ? this.subscribers
                : Reflect.get( target, name );
    },
    set ( target, name, newValue )
    {
        const oldVal = Reflect.get( target, name );
        Reflect.set( target, name, newValue );

        if ( name !== 'subscribers' )
            this.subscribers.forEach( func => func( newValue, oldVal ) );

        return true;
    },
    delete ( target, name )
    {
        const oldVal = Reflect.get( target, name );
        Reflect.deleteProperty( target, name );
        this.subscribers.forEach( func => func( undefined, oldVal ) );
    }
}
);

const scope = observable( {} );
scope.subscribe( console.log );

scope.a = 1;
Object.defineProperty( scope, 'property1', {
    value: 42,
    writable: false
} );
console.log( scope, Object.keys( scope ), scope.subscribers );

export default observable;
