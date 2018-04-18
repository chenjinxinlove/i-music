import fly from '../common/js/fly'

// 获取热门歌单
export function getPersonalizeds () {
  const url = '/personalized'
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取精品歌单
export function getSongList (cat, limit, offset) {
  const url = `/top/playlist/highquality?cat=${cat}&limit=${limit}&offset=${offset}`
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌单详情

export function getSongPlay (id) {
  const url = '/playlist/detail?id=' + id
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}