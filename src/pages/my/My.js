import React, { Component } from 'react'
import './My.css'
import { List } from 'antd-mobile';
import BScroll from 'better-scroll'
const Item = List.Item;
export default class My extends Component {
    constructor() {
        super()
        this.state = {
            menu: [
                { img: require('../../asstes/images/icon_1.png'), title: '钱包', num: 0 },
                { img: require('../../asstes/images/icon_2.png'), title: '优惠', num: 0 },
                { img: require('../../asstes/images/icon_3.png'), title: '积分', num: 0 }],
            setting: [
                {},
                { img: require('../../asstes/images/icon_4.png'), name: '我的积分' },
                { img: require('../../asstes/images/icon_5.png'), name: '我的订阅' },
                { img: require('../../asstes/images/icon_7.png'), name: '微聊联系人' },
                {},
                { img: require('../../asstes/images/icon_8.png'), name: '房贷计算器' },
                { img: require('../../asstes/images/icon_9.png'), name: '我的房子' },
                {},
                { img: require('../../asstes/images/icon_10.png'), name: '我的看房几记录' },
                { img: require('../../asstes/images/icon_11.png'), name: '我的回答' },
                {},
                { img: require('../../asstes/images/icon_12.png'), name: '设置' },
                { img: require('../../asstes/images/icon_13.png'), name: '意见反馈' },
            ],
            icon: localStorage.getItem('username') ? localStorage.getItem('username') : '登录/注册'
        }
    }
    render() {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }} id="my">
                <ul className="content" style={{ margin: 0, padding: 0 }}>
                    <div style={{ height: '180px', backgroundColor: '#108ee9', padding: '20px 10px', color: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={require("../../asstes/images/header.png")} alt="" style={{ height: '70px', width: '70px', marginRight: '10px' }} />
                            <div>
                                <p onClick={this.clikLogin.bind(this)}>{this.state.icon}</p>
                                <p>可以与经纪人发起聊天</p>
                            </div>
                        </div>
                        <ul style={{ display: 'flex', margin: 0, padding: 0, marginTop: '10px', listStyle: 'none' }} className="menu">
                            {
                                this.state.menu.map((ob) =>
                                    <li
                                        style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #fff', height: '100%' }}
                                        key={ob.title}
                                    >
                                        <p style={{ margin: 0 }}>{ob.num}</p>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={ob.img} alt="" style={{ width: '20px', height: '20px', marginRight: '6px' }}></img>
                                            <p>{ob.title}</p>
                                        </div>

                                    </li>
                                )
                            }

                        </ul>
                    </div>
                    <div style={{ flex: 1 }}>
                        <List>
                            {
                                this.state.setting.map((obj, i) => {
                                    if (obj.name)
                                        return <Item
                                            thumb={obj.img}
                                            arrow="horizontal"
                                            onClick={() => { console.log(111) }}
                                            key={i}
                                        >{obj.name}</Item>
                                    else
                                        return <div style={{ height: '6px', backgroundColor: '#eee' }} key={i}></div>
                                })
                            }

                        </List>
                    </div>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        new BScroll('#my', {
            click: true
        })
    }
    clikLogin() {
        if (!localStorage.getItem('username')) {
            this.props.h.push('/login')
        }
    }
}
