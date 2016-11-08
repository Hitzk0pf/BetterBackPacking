var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');

var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
    cssModulesIdentName = '[hash:base64]';
}

module.exports = {
    output: {
        publicPath: '/',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'css', 'scss'],
        modules: [
            'client',
            'node_modules',
        ],
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader?localIdentName=' + cssModulesIdentName + '&modules&importLoaders=1&sourceMap!postcss-loader',
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?outputStyle=compressed'
            }
        ],
        sassLoader: {
            includePaths: [
                './node_modules',
                // this is required only for NPM < 3.
                // Dependencies are flat in NPM 3+ so pointing to
                // the internal grommet/node_modules folder is not needed
                './node_modules/grommet/node_modules'
            ]
        }
    },
    postcss: () => [
        postcssFocus(),
        cssnext({
            browsers: ['last 2 versions', 'IE > 10'],
        }),
        postcssReporter({
            clearMessages: true,
        }),
    ],
};
