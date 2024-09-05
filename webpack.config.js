// https://webpack.js.org/guides/getting-started/

// Import node path module
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// TODO: DO I NEED THESE Plugins?
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let isProduction = process.env.NODE_ENV === "production";
console.log(process.env.NODE_ENV);
console.log('NODE_ENV:', process.env.NODE_ENV);

let config = {
    // the entry point to the app
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, isProduction ? "build" : "dist"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        clean: true, // cleans the output folder before building
        publicPath: isProduction ? "/AssetExitStrategies/" : "/",
    },

    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: isProduction ? undefined : {
        port: "9500",
        static: "./dist",
        open: true,
        hot: false,
        watchFiles: ["src/**/*", "index.html"],
        historyApiFallback: true,
        // the following options are for the dev server to allow access from browser stack
        allowedHosts: "all",  // Allows all hosts to connect
        host: "0.0.0.0",      // Ensures the server listens on all network interfaces
    },
    
    target: "web", // "node" or "web" (web is default)

    resolve: {
        /** "extensions" 
         * If multiple files share the same name but have different extensions, webpack will 
         * resolve the one with the extension listed first in the array and skip the rest. 
         * This is what enables users to leave off the extension when importing
         */
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'] // 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
         }),
         new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        // TODO: Add CopyWebpackPlugin to copy images to the build directory
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/images/favicon.ico', to: 'favicon.ico' }, // Copy favicon to the build directory
            ],
          }),
        // new BundleAnalyzerPlugin(),
	],
    module:{
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' 
         * file inside of a require()/import statement, use the babel-loader to transform it before you 
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        rules: [
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                    'css-loader',                // Resolves CSS imports and translates CSS into CommonJS
                    'less-loader'                // Compiles Less to CSS
                ]
            },
            {
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"], // css-loader happens first (reverse order)
			},
            { 
				test: /\.(ts|tsx)$/i,
                exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {
					    configFile: isProduction ? "tsconfig.prod.json" : "tsconfig.json"
					},
				},
			},
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
            // Fonts and SVGs
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // Safely try to find the package name
                        const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                        if (match) {
                            const packageName = match[1];
                            return `npm.${packageName.replace('@', '')}`;
                        }
                    
                        // Return a default name or handle the case where no match is found
                        return "miscellaneous";
                    },                    
                },
            },
        },
    },
    
}

module.exports = config;