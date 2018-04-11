import * as types from './mutation-types'

const matutaions = {
  [types.SET_COUNT] (state, count) {
    state.count = count
  }
}

export default matutaions