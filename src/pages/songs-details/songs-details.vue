<template>
  <div class="songs-details-wrapper" >
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :createname="createname"></music-list>
  </div>
</template>
<script>
import musicList from '@/components/music-list/music-list'
import { getSongPlay } from '../../api/songList'
import { getSongUrls } from '../../api/song'
import {HTTP_CODE} from '../../config'
import {createSong} from '@/common/js/song'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      songs: {}
    }
  },
  components: {
    musicList
  },
  computed: {
    title () {
      return this.recommendDisc.name
    },
    bgImage () {
      return this.recommendDisc.coverImgUrl
    },
    creatorname () {
      return this.recommendDisc.creator.nickname
    },
    ...mapGetters([
      'recommendDisc'
    ])
  },
  beforeMount () {
    const {id} = this.$route.query
    if (!id) {
      this.$router.push('/pages/recommend-list/main')
    }
    this._getSongPlay(id)
  },
  methods: {
    async _getSongPlay (id) {
      const data = await getSongPlay(id)
      const {code, result} = data
      if (code === HTTP_CODE) {
        const tracks = result.tracks
        const tracksIds = tracks.map(item => item.id)
        const urls = await getSongUrls(tracksIds)
        this._normalizeSongs(tracks, urls.data)
      }
    },
    _normalizeSongs (list, urls) {
      let ret = []
      list.forEach((musicData, index) => {
        if (musicData.id) {
          ret.push(createSong(musicData, urls[index].url))
        }
      })
      this.songs = ret
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
