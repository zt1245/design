import request from '@/utils/request'

export function addposList(data) {
  return request({
    url: 'cms//adv/addpos/add',
    method: 'post',
    data: data
  })
}
