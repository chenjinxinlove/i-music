import * as types from './mutation-types'

export const increment = function ({commit, state}) {
  let count = state.count
  count++
  commit(types.SET_COUNT, count)
}
export const decrement = function ({commit, state}) {
  let count = state.count
  count--
  commit(types.SET_COUNT, count)
  commit(types.SET_COUNT, count)
}