
import fly from '../common/js/fly'

// 获取歌曲url
export function getRankList () {
  const url = 'http://192.168.2.160:3001/v1/toplist/detail'
  return fly.get(url).then(res => {
    return Promise.resolve(res)
  })
}

