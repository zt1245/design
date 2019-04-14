import axios from 'axios'
const api = 'http://192.168.1.145:5000'
axios.defaults.headers.common['plat'] = 'AuthPlat'
export function zxAdvStatus(data) {
  return axios({
    url: `${api}/cms/v1/Adverts/statuspos`,
    method: 'get',
    params: {
      id: data.id,
      status: data.status === '正常' ? false : true
    }
  })
}

export function zxAdvDelete(id) {
  return axios({
    url: `${api}/cms/v1/Adverts/list`,
    method: 'get',
    params: {
      posId: id
    }
  })
}

export function zxAdvDelpos(id) {
  return axios({
    url: `${api}/cms/v1/Adverts/delpos`,
    method: 'get',
    params: {
      id: id
    }
  })
}
export function zxAdvAddpos(data) {
  return axios({
    url: `${api}/cms/v1/Adverts/addpos`,
    method: 'post',
    data: {
      title: data.title,
      description: data.description,
      displayOrder: data.displayOrder,
      status: data.status === '正常' ? true : false
    }
  })
}

export function zxAdvUpdate(data) {
  return axios({
    url: `${api}/cms/v1/Adverts/modifypos`,
    method: 'post',
    data: {
      id: data.id,
      title: data.title,
      description: data.description,
      displayOrder: data.displayOrder,
      status: data.status === '正常' ? true : false
    }
  })
}

export function zxAdvListpos(data) {
  return axios({
    url: `${api}/cms/v1/Adverts/listpos`,
    method: 'get',
    params: data
  })
}

export function zxAdvSearch(data) {
  return axios({
    url: `${api}/cms/v1/Adverts/listpos`,
    method: 'get',
    params: data
  })
}
