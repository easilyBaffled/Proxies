import React from 'react';
import kebabCase from 'lodash-es/kebabCase';

// :: void -> Object
export default new Proxy(
    {},
    {
    // :: string -> Component
        get: ( _, name ) => ( { children, className, ...props } ) => (
            <div className={ `${kebabCase( name )} ${className}` } { ...props }>
                { children }
            </div>
        )
    }
);

// Example
/*
const App = () => (
    <El.app>
        <El.text>Example</El.text>
        <El.text className="bold">Example</El.text>
        <El.text style={{ color: 'black' }}>Example</El.text>
    </El.app>
)

ReactDOM.render(<App />, document.getElementById("El"));
* */
