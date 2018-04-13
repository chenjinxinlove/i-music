import {timeout, baseUrl} from '../../config'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
// 设置超时
fly.config.timeout = timeout
// 设置请求基地址
fly.config.baseURL = baseUrl

export default fly