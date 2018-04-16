import fly from '../common/js/fly'

// 获取首页轮播
export function getPersonalizeds () {
  const url = '/personalized'
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
