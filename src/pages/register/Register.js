import React, { Component } from 'react'
import { WhiteSpace, InputItem, WingBlank, Button, Checkbox } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { valitecode, reg } from '../../asstes/api/api'
export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            acc: '',
            pwd: '',
            oldacc: '',
            oldpwd: '',
            vCode: '',
            ma: '获取验证码',
            st: false
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: '#fff', height: '100%', paddingTop: "30px" }}>
                <WingBlank size="lg">
                    <InputItem placeholder="请输入手机号" value={this.state.acc} onChange={this.num.bind(this, 'acc')} />
                    <InputItem placeholder="请输入密码" value={this.state.pwd} onChange={this.num.bind(this, 'pwd')} />
                    <InputItem placeholder="请输入验证码" extra={this.state.ma} onExtraClick={this.getValitecode.bind(this)} value={this.state.vCode} />
                    <WhiteSpace />
                    <Checkbox>
                        <span style={{ display: 'inline-block', lineHeight: '21px', marginLeft: '10px', marginRight: '20px' }}>我已同意</span>
                    </Checkbox>
                    <a href="#/" style={{ color: '#108ee9', fontSize: '12px' }}>《用户服务协议》及《隐私权政策》</a>
                    <WhiteSpace size="xl" />
                    <Button type="primary" onClick={this.subReg.bind(this)}>立即注册</Button>
                    <WhiteSpace size="sm" />
                    <Link to="/login" style={{ color: '#108ee9', fontSize: '12px' }}>已有账号</Link>
                </WingBlank>
            </div>
        )
    }
    // 获取验证函数
    getValitecode() {
        let num = 60
        if (this.state.st) return
        valitecode().then(({ data }) => this.setState({ vCode: data }))
        this.setState({
            ma: num + '秒后失效',
            st: true
        })
        let fn = () => {
            num--
            this.setState({ ma: num + '秒后失效', st: true })
            if (num === 0) {
                clearInterval(this.timer)
                this.setState({ ma: '获取验证码', st: false })
            }
        }
        this.timer = setInterval(fn, 1000)


    }
    // 受控表单
    num(per, val) {
        this.setState({ [per]: val })
    }
    // 提交注册
    subReg() {
        let { acc, pwd, st, oldacc, oldpwd } = this.state
        if (acc === oldacc || pwd === oldpwd || !st) return
        this.setState({ oldacc: acc, oldpwd: pwd })
        reg(acc, pwd).then(({ data }) => {
            if (data === 'ok') this.props.history.push('/login')
            else if (data === "fail") console.log(data)
        })

    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
}
