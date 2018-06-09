
export default log =>
{
    const addDefaultToObject = defaultHandler => obj =>
        new Proxy( obj, {
            get ( target, prop, proxy )
            {
                return Reflect.get( target, prop, proxy )
                       || defaultHandler( prop, target, proxy );
            }
        } );
};
