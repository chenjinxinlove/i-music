export const getSongListHots = state => state.songListHots

export const getSelectValue = state => state.selectValue

export const recommendDisc = state => state.recommendDisc

export const getSongPlay = state => state.getSongPlay

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = state => {
  return state.playlist[state.currentIndex] || {}
}
