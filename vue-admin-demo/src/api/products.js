import request from '@/utils/request'

const serverIP = '127.0.0.1';

const port = '5757';

export function fetchList(query) {
  return request({
    url: `http://${serverIP}:${port}/admin/products`,
    method: 'get',
    params: query
  })
}

export function modifyIsuse(data) {
  return request({
    url: `http://${serverIP}:${port}/admin/modifyIsuse`,
    method: 'post',
    data
  })
}

export function addProduct(data) {
  return request({
    url: `http://${serverIP}:${port}/admin/addProduct`,
    method: 'post',
    data
  })
}

export function modifyProduct(data) {
  return request({
    url: `http://${serverIP}:${port}/admin/modifyProduct`,
    method: 'post',
    data
  })
}
