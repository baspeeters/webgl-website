import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

const config = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'main.ts'),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/three/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
                to: 'fonts',
            },
        ]),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};

export default config;
