import * as types from './mutation-types'

const matutaions = {
  [types.SET_SONG_LIST_HOTS] (state, songListHots) {
    state.songListHots = songListHots
  },
  [types.SET_SELECT_VALUE] (state, selectValue) {
    state.selectValue = selectValue
  },
  [types.SET_SONG_PLAY] (state, songplay) {
    state.songplay = songplay
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

export default matutaions