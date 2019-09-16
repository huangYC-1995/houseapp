import React, { Component } from 'react'
import './Login.css'
import { Flex, WhiteSpace, InputItem, WingBlank, Button } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { login } from '../../asstes/api/api'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            count: '',
            pwd: '',
            oldcount: '',
            oldpwd: '',
            show:'hidden'
        }
    }

    render() {
        return (
            <div>
                <Flex justify="center">
                    <img src={require('../../asstes/images/Logo.png')} alt='LOGO' className='logo' style={{ marginTop: '50px' }} />
                </Flex>
                <WingBlank size="lg">
                    <InputItem placeholder="请输入帐号" clear value={this.state.count} onChange={(val) => { this.setState({ count: val }) }}>
                        <div style={{ backgroundImage: `url(${require('../../asstes/images/icom_username.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <InputItem placeholder="请输入密码" clear type="password" value={this.state.pwd} onChange={(val) => { this.setState({ pwd: val }) }}>
                        <div style={{ backgroundImage: `url(${require('../../asstes/images/icon_pwd.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <p style={{visibility:this.state.show,color:'#f00'}}>用户名或密码错误</p>
                    <Button type="primary" onClick={this.userSubmit.bind(this)}>登录</Button>
                    <WhiteSpace size="sm" />
                    <Flex justify="between">
                        <Link to='/register'><span className="link">手机快速注册</span></Link>
                        <Link to="/register"><span className="link">忘记密码</span></Link>
                    </Flex>
                </WingBlank>
                <p style={{ textAlign: 'center', position: 'fixed', width: '100%', bottom: '20px', fontSize: '12px', color: '#ccc' }}>
                    登录/注册即代表同意注册协议
                </p>
            </div>
        )
    }
    userSubmit() {
        let { count, pwd, oldcount, oldpwd } = this.state
        if (count === oldcount && pwd === oldpwd) return
        this.setState({
            oldcount: count,
            oldpwd: pwd
        })
        login(this.state.count, this.state.pwd)
            .then(({ data }) => {
               if(data==='ok'){
                  this.props.history.push('/')
                  localStorage.setItem('username',count)
               } else if(data==='fail'){
                this.setState({
                    show:'visible'
                })
               }
            })
    }
}
