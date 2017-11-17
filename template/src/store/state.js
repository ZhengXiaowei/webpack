import storage from 'good-storage'
const state = {
  token: storage.get('token') ? storage.get('token') : ''
}

export default state
