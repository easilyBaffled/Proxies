import { isA, addDefaultCase } from '../proxies';

export default subject => 
{
    const setConditional = conditional => ( pass, fail ) =>
        conditional( subject ) ? pass( subject ) : fail( subject );
    setConditional.exists = setConditional( s => s );
    return addDefaultCase( setConditional, name => setConditional( isA[ name ] ) );
};
