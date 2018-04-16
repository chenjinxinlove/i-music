import * as types from './mutation-types'

const matutaions = {
  [types.SET_PERSONALIZEDS] (state, personalizeds) {
    state.personalizeds = personalizeds
  }
}

export default matutaions