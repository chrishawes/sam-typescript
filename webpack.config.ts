import { Configuration } from 'webpack'
import { resolve, join, parse } from 'path'
import { sync } from 'glob'

const getEntries = (path: string): string[] => {
  const files = sync(`${resolve(path)}/**/*.+(j|t)s`)

  return files.reduce((entries: any, file: string) => {
    const { dir, name } = parse(file)

    entries[join(dir.replace(__dirname, ''), name)] = file
    return entries
  }, {})
}

const config: Configuration = {
  entry: getEntries(join(__dirname, 'src', 'handlers')),
  devtool: 'source-map',
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: resolve('./', '.aws-sam/build')
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  externals: {
    'aws-sdk': 'aws-sdk'
  },
  target: 'node'
}

export default config
