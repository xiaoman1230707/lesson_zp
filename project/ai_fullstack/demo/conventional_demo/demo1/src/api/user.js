export const login = (data)=>{
    return axios.post('/login',data)
}

export const getUserInfo = ()=>{
    return request.get('/user/info')
}