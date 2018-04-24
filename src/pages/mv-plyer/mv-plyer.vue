<template>
  <div class="mv-plyer">
  <video v-if="mv.brs" id="myVideo" :src="'http://localhost:3000/mv/url?url=' + mv.brs['480']"   enable-danmu danmu-btn controls></video>
  </div>
</template>
<script>
import {getMvInfo} from '../../api//mv'
import {HTTP_CODE} from '../../config'

export default {
  data () {
    return {
      mv: {}
    }
  },
  beforeMount () {
    const {id} = this.$route.query
    if (!id) {
      this.$router.back()
    }
    this._getMvInfo(id)
  },
  methods: {
    async _getMvInfo (id) {
      const {code, data} = await getMvInfo(id)
      if (code === HTTP_CODE) {
        this.mv = data
      }
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
