import fly from '../common/js/fly'

// 获取推荐mv
export function getRemMv () {
  const url = 'personalized/mv'
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取最新MV

export function getNewMV () {
  const url = 'mv/first'
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取mv的详情

export function getMvInfo (id) {
  const url = 'mv?mvid=' + id
  return fly.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}