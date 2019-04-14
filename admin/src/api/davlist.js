import axios from 'axios'
axios.defaults.headers.common['plat'] = 'AuthPlat'
const api = 'http://192.168.1.145:5000'
export function getAdvList(posId) {
  return axios({
    url: `${api}/cms/v1/Adverts/list`,
    method: 'get',
    params: {
      posId: posId
    }
  })
}

export function addAdvList(data) {
  return axios({
    url: `${api}/cms/v1/Adverts/add`,
    method: 'post',
    data: data
  })
}

export function advDelete(id) {
  return axios({
    url: `${api}/cms/v1/Adverts/del`,
    method: 'get',
    params: {
      id: id
    }
  })
}

export function advModify(id, status) {
  return axios({
    url: `${api}/cms/v1/Adverts/status`,
    method: 'get',
    params: {
      id: id,
      status: status
    }
  })
}

export function Modifycontent(data) {
  console.log(data)
  return axios({
    url: `${api}/cms/v1/Adverts/modfiy`,
    method: 'post',
    data: data
  })
}

export function fileupload() {
  return axios({
    url: `${api}/file/api/Domain/open`,
    method: 'post',
    data: {
    }
  })
}

export function kaiupload() {
  return axios({
    url: `${api}/file/api/Domain/open`,
    method: 'post',
    data: {
      bucketCount: 1,
      bucketSize: parseInt(1000 * 1024 * 1024),
      status: 0
    }
  })
}
