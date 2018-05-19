import React from 'react';
import { func, arrayOf } from 'prop-types';

import { El } from '../../proxies';

const Assert = ( { condition } ) => (
    <pre>
        { condition() ? <El.pass /> : <El.fail /> }
        { condition.toString().match( /return ([^;]+)/ )[ 1 ] }
    </pre>
);
Assert.propTypes = {
    condition: func
};

export const Asserts = ( { conditions } ) => (
    <El.app>
        { conditions.map( con => <Assert con={con} /> ) }
    </El.app>
);
Asserts.propTypes = {
    conditions: arrayOf( func )
};

export default Assert;
