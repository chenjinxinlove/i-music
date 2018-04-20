import {playMode} from '../config/index'
const state = {
  'songListHots': [],
  'selectValue': '摇滚',
  'songPlay': [],
  // 是否播放
  playing: false,
  // 是否全屏
  fullScreen: false,
  // 播放列表
  playlist: [],
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前的index
  currentIndex: -1
}
export default state