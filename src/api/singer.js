import fly from '../common/js/fly'

// 获取热门歌手
export function getHotSinger (limit = 4) {
  const url = `/top/artists?offset=0&limit=${limit}`
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
