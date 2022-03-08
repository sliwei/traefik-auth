import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig, loadEnv } from 'vite'
import packageInfo from './package.json'

const path = require('path')
// const { getThemeVariables } = require('antd/dist/theme')

export default async ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  console.log(process.env.VITE_APP_ENV)
  const isProd =
    process.env.VITE_APP_ENV && process.env.VITE_APP_ENV !== 'local'
  let plugins = [reactRefresh()]
  let base: any = '/'
  let sourcemap = true
  if (isProd) {
  //   const env = process.env.VITE_APP_ENV || 'dev'
  //   const uploader = new FileUploader({
  //     env, // 必传
  //     bucket: 'fe-activity' // 可不传，默认 ‘one-by-one’
  //     // prefix: `${env}/classroom/${new Date().toISOString().substr(0, 10)}/${
  //     //   packageInfo.version
  //     // }/`, //可不传,默认 ‘项目名/打包环境/版本号’
  //   })
  //   base = await uploader.init()
    base = 'https://i.bstu.cn/auth/'
  //   plugins.push(uploader.UploadPlugin())
  //   sourcemap = false
  }
  return defineConfig({
    root: __dirname,
    build: {
      sourcemap
    },
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // ...aliyunTheme.default,
            '@primary-color': '#1978ff'
            // '@font-size-sm': '12px',
            // '@font-size-base': '12px',
            // ...getThemeVariables({
            //   dark: true, // 开启暗黑模式
            //   compact: true, // 开启紧凑模式
            // }),
          },
          javascriptEnabled: true
        }
      }
    },
    plugins,
    base, // or '/'
    server: {
      // fsServe: {
      //   root: path.resolve(__dirname, '../'),
      //   // root: join(PACKAGE_ROOT),
      // },
      // 暂时作为web开发启动项
      proxy: {
        '^/server': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/authApi/, '')
        }
      }
    }
  })
}
