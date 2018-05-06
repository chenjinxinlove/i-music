import fly from '../common/js/fly'

// 获取首页轮播
export function getBanner () {
  const url = '/banner'
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取最新音乐

export function getNewMusics (limit = 3) {
  console.log(3)
  const url = `/top/album?offset=0&limit=${limit}`
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}