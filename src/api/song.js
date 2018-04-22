import fly from '../common/js/fly'

// 获取歌曲url
export function getSongUrls (ids) {
  const id = !Array.isArray(ids) ? ids : ids.join(',')
  const url = 'music/url?id=' + id
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌曲歌词

export function getLyric (id) {
  const url = 'lyric?id=' + id
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
