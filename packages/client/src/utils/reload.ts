// import { message } from 'antd'

export interface ReloadType {
  serveTime?: number
  maxTime?: number
}

export default class {
  maxTime = 600 // seconds
  time = this.maxTime
  intervalId: any

  // eslint-disable-next-line no-unused-vars
  init(conf?: ReloadType) {
    // console.log('serve time:', serveTime) // 服务器时间，好像没用到
    this.maxTime = conf?.maxTime || this.maxTime
    this.time = this.maxTime
    return this
  }

  start(cb: () => void) {
    window.addEventListener('keydown', () => {
      this.time = this.maxTime // reset
    })
    window.addEventListener('mousemove', () => {
      this.time = this.maxTime // reset
    })
    window.addEventListener('mousedown', () => {
      this.time = this.maxTime // reset
    })
    const that = this
    this.intervalId = setInterval(function () {
      that.time--
      if (that.time <= 0) {
        // message.success('自动刷新~')
        cb ? cb() : window.location.reload()
        that.intervalId && clearInterval(that.intervalId)
      }
    }, 1000)
    return this
  }

  destroy() {
    this.intervalId && clearInterval(this.intervalId)
  }
}
