module.exports = {
  presets:[
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [ 'moduler-resolver', {
      alias: {
        '@modelss': './src/models',
        '@controller': './src/controller'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}