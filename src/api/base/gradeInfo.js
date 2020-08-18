import request from '@/utils/request'

export function list() {
  return request({
    url: '/grade/list',
    method: 'get'
  })
}

export function remove(id) {
  return request({
    url: '/grade/remove?gradeId=' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/grade/create',
    method: 'post',
    data
  })
}
