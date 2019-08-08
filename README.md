# **setup/webpack**

**Please note:** before running any code from this branch, be sure to run `npm install`.

This repository has been created in order to demonstrate how Webpack should be configured from scratch without the need to use **createReactApp** and subsequently eject it in order to gain access to NPM **start** and **build** routines.

<br />

## **NPM modules required**

Listed below are all NPM modules which are required to achieve this, along with a brief breakdown (where applicable) of how the code works, end-to-end.

<br />

## Babel related

Babel is used for transpiling JavaScript code down to ES5 syntax from ES6. This results in the code being parseable within browsers yet to fully support ECMAScript 6 natively. The following modules are required (via NPM) in order to allow Webpack to perform the necessary transpilation.

- **@babel/core** - https://www.npmjs.com/package/@babel/core

- **@babel/plugin-proposal-class-properties** - https://www.npmjs.com/package/@babel/plugin-proposal-class-properties

- **@babel/plugin-syntax-dynamic-import** - https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import

- **@babel/preset-env** - https://www.npmjs.com/package/@babel/preset-env

- **@babel/preset-react** - https://www.npmjs.com/package/@babel/preset-react

- **babel-loader** - https://www.npmjs.com/package/babel-loader

<br />

## Webpack related

Webpack is a package bundler which (through configuration) can be used to bundle JavaScript, images, Sass/CSS and a multitude of files types into a compressed format, beneficial for deployments.

- **clean-webpack-plugin** - https://www.npmjs.com/package/clean-webpack-plugin

    > This is a bit like RimRaf, in that it allows you to specify the build directory to remove when re-building a project. It is possible that removed assets could remain in your build directory unless it is regularly cleaned out. This module runs prior to any build, ensuring that your build directory is always reflecting only the files which should be build (and subsequently deployed).

- **html-webpack-plugin** - https://www.npmjs.com/package/html-webpack-plugin

    > This module builds the HTML file which your single-page application will reside from. It also is where Webpack will embed script file references, so that compiled JavaScript files are correctly served when viewing the build site.

- **terser-webpack-plugin** - https://www.npmjs.com/package/terser-webpack-plugin

    > Terser is responsible for the uglification of and minification of JavaScript code within a project.

- **webpack** - https://www.npmjs.com/package/webpack
  
- **webpack-bundle-analyzer** - https://www.npmjs.com/package/webpack-bundle-analyzer
  
    > This is very much an optional feature to use, and should be used with caution as it can add quite an overhead to a project. What is does is analyzes the dependency tree of the JavaScript files (modules) within a project and visualizes it within the browser. It can be particularly useful for seeing exactly how code is produced and how the filesize is broken down. By default, this has been disabled within the Development Webpack config.
  
- **webpack-cli** - https://www.npmjs.com/package/webpack-cli

- **webpack-dev-server** - https://www.npmjs.com/package/webpack-dev-server

    > The NPM start command fires up a Webpack development server, which includes hot-reloading out of the box. What this means is that any JavaScript or CSS/Sass files which are changed will be immediately reflected within the site loaded as part of the Webpack Dev Server. Essentially how this works is that Webpack listens for file changes and re-compiles the necessary files before re-rendering the server (inclusive of the latest set of updates). This should be your de-facto development environment whilst coding.

- **webpack-merge** - https://www.npmjs.com/package/webpack-merge

    > Webpack merge is a very useful module which allows for multiple Webpack configuration objects to be merged together. This is used within this repository, as can be seen within both the /webpack/config.js file and the associated files within /webpack. Based on a command line argument within package.json, Webpack is informed that it is either running as DEVELOPMENT or PRODUCTION:

    ```javascript
    "scripts": {
        "start": "webpack-dev-server --env.DEVELOPMENT --open",
        "build": "run-s build-to-production && node server",
        "build-local": "webpack --env.DEVELOPMENT",
        "build-to-production": "webpack --env.PRODUCTION"
    },
    ```

    > Within /webpack.config.js, a check is performed to see whether Webpack is running in either DEVELOPMENT or PRODUCTION mode. Based on this, the common Webpack configuration is extended either with webpack.dev.config.js or webpack.prod.config.js. Webpack-merge is the module responsible for joining these 2 configuration blocks. In handling the configuration this way, it allows development and production configuration to be entirely separate, allowing for complete flexibility in how production builds are put together, without interfering in any way with ongoing development (and importantly vice versa).

    ```javascript
    // Webpack configuration
    const webpackCommon = require('./webpack/webpack.common.js');
    const webpackDev = require('./webpack/webpack.dev.config.js')
    const webpackProd = require('./webpack/webpack.prod.config.js');
    let webpackConfig = webpackCommon;

    module.exports = env => {
        const environment = env.DEVELOPMENT ? 'dev' : 'prod';

        switch(environment){
            case 'dev':
                webpackConfig = webpackMerge(webpackConfig, webpackDev);
                break;
            case 'prod':
                webpackConfig = webpackMerge(webpackConfig, webpackProd);
                break;
            default:
                webpackConfig = webpackMerge(webpackConfig, webpackDev);
                break;
        }

        return webpackConfig;
    };
    ```

    <br />

## Other

The modules below are also included within this branch, however they are included due to the very basic React code which is also contained. For example, there are a couple of sample SASS files which compile down to CSS. This requires a few of the modules below.

- **css-loader** - https://www.npmjs.com/package/css-loader

- **file-loader** - https://www.npmjs.com/package/file-loader

- **node-sass** - https://www.npmjs.com/package/node-sass

- **npm-run-all** - https://www.npmjs.com/package/npm-run-all

    > npm-run-all is a really interesting module. It allows multiple NPM scripts to be executed either in parallel or in sequence. This can be extremely useful when wanting to run multiple NPM scripts under the umbrella of one individual script. This feature is used in order to run a sequence of tasks when building to production. As shown in the code below, first a script called **build-to-production** is run, following upon the completion of that by the running of another script **node server**. In this instance, node/server/index.js should NOT be called until the build is complete. The command **run-s** defines that the scripts are run in a sequence, one after the other. To run multiple scripts in parallel, **run-p** should prefix the script names.

    ```javascript
    "scripts": {
        ...
        "build": "run-s build-to-production && node server",
        ...
    },
    ```

- **opn** - https://www.npmjs.com/package/opn

    > Opn merely opens a specified URL within a new browser window/tab.

- **react** - https://www.npmjs.com/package/react

- **react-dom** - https://www.npmjs.com/package/react-dom

- **react-router-dom** - https://www.npmjs.com/package/react-router-dom

- **sass-loader** - https://www.npmjs.com/package/sass-loader

- **style-loader** - https://www.npmjs.com/package/style-loader

- **terser** - https://www.npmjs.com/package/terser

    > This is a requirement for **terser-webpack-plugin** to run successfully.

- **url-loader** - https://www.npmjs.com/package/url-loader

    > This allows for the conversion of files into base64 URIs, which can help reduce the number of assets needing to be downloaded as part of an application.

<br />

## **Running webpack commands from package.json**

There are 3 separate scripts which can be run from the package.json file:

1. **npm run start**

    > This is solely for spinning up a webpack-dev-server instance, with the entire codebase compiled against that server. The **--open** flag contained as part of this script block will automatically load the development server URL in a browser, and refresh every time a change is made to the code.

2. **npm run build**

    > This script will compile (via Webpack) the entire application and place the contents within the /dist directory, ready for deployment. Following this, an Express server is spun up which will then automatically load the index file from the /dist directory.

3. **npm run build-local / npm run build-to-production**

    > Both of these scripts will build the site, but with a boolean argument for either DEVELOPMENT or PRODUCTION. This will ensure that the build process derives Webpack configuration from the appropriate Webpack configuration file. Differences between development and production compilation include things such as the uglification of JavaScript code within production.