import axios from 'axios'
import qs from 'qs'

// export const ip = 'http://127.0.0.1:80'
export const ip = 'http://172.16.10.8:80'
const conn = axios.create({
    baseURL: ip
    // baseURL: 'http://192.168.50.238:80'
})
// 用户登录
// acc 用户名 
// pwd 密码
export function login(acc, pwd) {
    return conn.post('/login.php', qs.stringify({ acc, pwd }))
}

// 验证码获取
export function valitecode() {
    return conn.get('/valitecode.php')
}

// 用户注册
// acc 用户名 
// pwd 密码
export function reg(acc,pwd) {
    return conn.post('/reg.php',qs.stringify({acc,pwd}))
}

// 房产信息
export function getHouse(){
    return conn.get('/gethouselist.php')
}