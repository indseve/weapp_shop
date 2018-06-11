import request from '@/utils/request'

const serverIP = '127.0.0.1';

const port = '5757';

export function fetchList(query) {
  return request({
    url: `http://${serverIP}:${port}/admin/orders`,
    method: 'get',
    params: query
  })
}

export function productList(data) {
  return request({
    url: `http://${serverIP}:${port}/admin/getBillProducts`,
    method: 'post',
    data
  })
}
