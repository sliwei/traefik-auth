export const lTen = (val: number) => {
  return val > 10 ? val : '0' + val
}

export const formatTime = (duration: number) => {
  const parseIntNum = (val: number) => lTen(parseInt(String(val)))

  if (duration < 60) {
    return `00:${parseIntNum(duration)}`
  }

  const timeH = duration / 60 / 60
  const timeM = duration / 60

  if (timeM > 60) {
    return `${parseIntNum(timeH)}:${parseIntNum(timeM % 60)}:${parseIntNum(
      duration % 60
    )}`
  } else {
    return `${parseIntNum(timeM)}:${parseIntNum(duration % 60)}`
  }
}

// 获取地址栏参数
export const getQueryVal = (
  key: string,
  urlSearch: string = window.location.href
) => {
  if (!urlSearch) {
    return ''
  }
  let searchArr = urlSearch.substr(1).split('&')
  for (let i = 0, len = searchArr.length; i < len; i++) {
    if (searchArr[i].indexOf(key) !== -1) {
      return searchArr[i].split('=')[1]
    }
  }
  return null
}

export interface Identities<T> {
  data: T
  state: boolean
}

export const getLocalInfo = <T>(key: string, supplement: any = {}): Identities<T> => {
  let data,
    state = true
  try {
    data = JSON.parse(localStorage[key]) || supplement
    if (!(data.length || Object.keys(data).length)) {
      state = false
      data = supplement
    }
    console.log('data', key, data)
  } catch (e) {
    data = supplement
    state = false
  }
  return { data, state }
}
