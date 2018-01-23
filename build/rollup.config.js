import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import uglify from 'rollup-plugin-uglify'

function config (prod) {
  const plugins = [
    builtins(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      namedExports: {
        'node_modules/react-dnd/lib/index.js': [ 'DragSource', 'DropTarget', 'DragDropContext' ]
      }
    }),
    resolve({
      browser: true,
      main: true
    })
  ]
  if (prod) {
    plugins.push(uglify())
  }
  const min = prod ? '.min' : ''
  return {
    input: 'src/index.js',
    output: {
      file: `dist/ant-dragger${min}.js`,
      format: 'cjs',
      name: 'AntDragger',
      exports: 'named',
      sourcemap: true,
      globals: {
        'react-dnd': 'ReactDnD',
        'react-dnd-html5-backend': 'ReactDnDHTML5Backend',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes'
      }
    },
    external: [ 'react', 'react-dom', 'react-dnd', 'react-dnd-html5-backend', 'prop-types' ],
    plugins
  }
}

export default [
  config(),
  config(true)
]
