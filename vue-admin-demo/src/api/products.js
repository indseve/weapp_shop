import request from '@/utils/request'

import config from '@/shop_config//shop_config'

export function fetchList(query) {
  return request({
    url: `http://${config.serverip}:${config.port}/products`,
    method: 'get',
    params: query
  })
}

export function modifyIsuse(data) {
  return request({
    url: `http://${config.serverip}:${config.port}/modifyIsuse`,
    method: 'post',
    data
  })
}

export function addProduct(data) {
  return request({
    url: `http://${config.serverip}:${config.port}/addProduct`,
    method: 'post',
    data
  })
}

export function modifyProduct(data) {
  return request({
    url: `http://${config.serverip}:${config.port}/modifyProduct`,
    method: 'post',
    data
  })
}
