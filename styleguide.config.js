module.exports = {
  title: 'Sizigi',
  sections: [
    {
      name: 'Atoms',
      components: 'src/components/atoms/**/*.jsx',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Molecules',
      components: 'src/components/molecules/**/*.jsx',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Organisms',
      components: 'src/components/organisms/**/*.jsx',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
    {
      name: 'Templates',
      components: 'src/components/templates/**/*.jsx',
      exampleMode: 'collapse',
      usageMode: 'collapse',
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  },
};
