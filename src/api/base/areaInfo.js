import request from '@/utils/request'

export function areaList(parentId) {
  return request({
    url: '/area/areaList?parentId=' + parentId,
    method: 'get'
  })
}

export function pathList(parentId) {
  return request({
    url: '/area/pathListByCode?parentId=' + parentId,
    method: 'get'
  })
}

export function removeByCode(code) {
  return request({
    url: '/area/areaDel?areaCode=' + code,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/area/areaAdd',
    method: 'post',
    data
  })
}
