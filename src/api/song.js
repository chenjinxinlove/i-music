import fly from '../common/js/fly'

// 获取歌曲url
export function getSongUrl (id) {
  const url = 'music/url?id=' + id
  return fly.get(url).then(res => {
    return Promise.resolve(res)
  })
}

// 获取歌曲歌词

export function getLyric (id) {
  const url = 'lyric?id=' + id
  return fly.get(url).then(res => {
    return Promise.resolve(res)
  })
}
