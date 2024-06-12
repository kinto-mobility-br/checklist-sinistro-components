const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    index: './src/index.tsx',
    UploadList: {
      import: "./src/components/UploadList.tsx",
      dependOn: "Icons"
    },
    SignatureCanvas: "./src/components/SignatureCanvas.tsx",
    SelectBadges: "./src/components/SelectBadges.tsx",
    FormFactory: "./src/components/FormFactory.tsx",
    Icons: "./src/components/icons.tsx",
    InputMasks: "./src/helpers/masks.ts",
    promisify: "./src/helpers/promisify",
    validators: "./src/helpers/validators"
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'kinto-brasil-checklist-sinistro-components',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};

module.exports = config;