import { getLyric, getSongUrl } from '../../api/song'
import { ERR_OK } from '../../../config'

const getSongUrlFun = async id => {
  if (this.url) {
    return Promise.resolve(this.url)
  }
  const res = await getSongUrl(id)
  if (res.code === ERR_OK) {
    return res.data[0].url
    // Promise.resolve(this.url)
  } else {
    return new Error('no lurl')
  }
}

export default class Song {
  constructor ({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    const res = getLyric(this.id)
    if (res.code === ERR_OK) {
      this.lyric = res.lrc.lyric
      Promise.resolve(this.lrc.lyric)
    } else {
      Promise.reject(new Error('no lyric'))
    }
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists.name),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.duration,
    image: musicData.album.picUrl,
    url: getSongUrlFun(musicData.id)

  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}
