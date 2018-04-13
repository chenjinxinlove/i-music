import fly from '../common/js/fly'

// 获取首页轮播
export function getBanner () {
  const url = '/banner'
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

