<template>
  <div class="songs-details-wrapper" >
    <music-list :title="今日推荐" :bg-image="bgImage" :songs="songs" :createname="createname"></music-list>
  </div>
</template>
<script>
import musicList from '@/components/music-list/music-list'
import { getDayRecommen, getSongUrls } from '../../api/song'
import {HTTP_CODE} from '../../config'
import {createSong} from '@/common/js/song'

export default {
  data () {
    return {
      songs: {},
      bgImage: 'http://p1.music.126.net/J5-HRL_CWtQMOtTgPAqaCA==/109951163260716273.jpg'
    }
  },
  components: {
    musicList
  },
  computed: {
  },
  beforeMount () {
    this._getDayRecommen()
  },
  methods: {
    async _getDayRecommen (id) {
      const data = await getDayRecommen(id)
      const {code, result} = data
      if (code === HTTP_CODE) {
        const tracks = result
        const tracksIds = tracks.map(item => item.id)
        const urls = await getSongUrls(tracksIds)
        this._normalizeSongs(tracks, urls.data)
      }
    },
    _normalizeSongs (list, urls) {
      let ret = []
      console.log(list, urls)
      list.forEach((musicData, index) => {
        if (musicData.id) {
          ret.push(createSong(musicData.song, urls[index].url))
        }
      })
      console.log(ret)
      this.songs = ret
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
