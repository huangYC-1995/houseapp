import React, { Component } from 'react'
import { NavBar, Icon, WingBlank } from 'antd-mobile';
import { city, hotcity } from '../../json/citys.json';
import BScroll from 'better-scroll'
import './City.css'
export default class City extends Component {
    constructor() {
        super()
        this.state = {
            city: city,
            hotcity: hotcity
        }
    }
    componentDidMount() {
        this.citys = new BScroll('#citys', {
            click: true
        })
    }
    render() {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
                <div style={{ height: '60px' }}>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.back.bind(this)}
                    >城市选择
                </NavBar>
                </div>
                <div style={{ overflow: 'auto' }} id="citys">
                    <ul className="content" style={{ marginLeft: 0, paddingLeft: 0 }}>
                        <div>
                            <p className="city" id={this.state.hotcity.initial}>
                                {this.state.hotcity.initial}
                            </p>
                            <div style={{ padding: '0 20px' }} className="item">{
                                this.state.hotcity.list.map((v, i) => {
                                    return <p style={{ lineHeight: '40px', borderBottom: '1px solid #eee', margin: 0 }} key={i}>{v}</p>
                                })
                            }
                            </div>
                        </div>
                        {
                            this.state.city.map((obj, i) =>
                                <div key={i}>
                                    <p className="city" key={obj.initial} id={obj.initial}>
                                        {obj.initial}
                                    </p>
                                    <div style={{ padding: '0 20px' }} className="item">{
                                        obj.list.map((v, i) => {
                                            return <p style={{ lineHeight: '40px', borderBottom: '1px solid #eee', margin: 0 }} key={i}>{v.name}</p>
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        }
                    </ul>
                </div>
                <div style={{ width: '20px', position: 'fixed', right: 0, top: '100px', fontSize: '10px', textAlign: 'center' }}>
                    <p style={{ margin: 0, lineHeight: '20px' }} onClick={this.clickCity.bind(this, this.state.hotcity.initial)}>{this.state.hotcity.initial.substr(0, 1)}</p>
                    {
                        this.state.city.map(obj =>
                            <p
                                style={{ margin: 0, lineHeight: '20px' }}
                                onClick={this.clickCity.bind(this, obj.initial)}
                                key={obj.initial}>
                                {obj.initial}
                            </p>
                        )
                    }
                </div>
            </div>
        )
    }
    back() {
        this.props.history.push('/')
    }
    clickCity(id) {
        this.citys.scrollToElement('#' + id)
    }
}
