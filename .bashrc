{
    env: {
        development: {
            presets: [
                [ "env", {
                    targets: {
                        node: 'current',
                    },
                } ],
                'babel-preset-react'
            ]
        }
    }
}
