import request from '@/utils/request'

export function provinces() {
  return request({
    url: '/area/provinces',
    method: 'get'
  })
}

export function cities(provinceId) {
  return request({
    url: '/area/cities',
    method: 'get'
  })
}

export function towns(cityId) {
  return request({
    url: '/area/towns',
    method: 'get'

  })
}

export function areaList(parentId) {
  return request({
    url: '/area/areaList?parentId=' + parentId,
    method: 'get'
  })
}
