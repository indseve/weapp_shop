import request from '@/utils/request'

import config from '@/shop_config//shop_config'

export function fetchList(query) {
  return request({
    url: `http://${config.serverip}:${config.port}/orders`,
    method: 'get',
    params: query
  })
}

export function productList(data) {
  return request({
    url: `http://${config.serverip}:${config.port}/getBillProducts`,
    method: 'post',
    data
  })
}
