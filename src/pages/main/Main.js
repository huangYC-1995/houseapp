import React, { Component } from 'react'
import { Carousel, Grid } from 'antd-mobile';
import './main.css'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'

// 引入接口
import { getHouse, ip } from '../../asstes/api/api'

class main extends Component {
    constructor() {
        super()
        this.state = {
            data: ['4.jpg'],
            menu: [{ icon: 'icon01.png', text: '新房' },
            { icon: 'icon02.png', text: '二手房' },
            { icon: 'icon03.png', text: '租房' },
            { icon: 'icon04.png', text: '商铺写字楼' },
            { icon: 'icon05.png', text: '卖方' },
            { icon: 'icon07.png', text: '海外房产' },
            { icon: 'icon06.png', text: '小区房价' },
            { icon: 'icon08.png', text: '问答' },].map(obj => {
                return { icon: require('../../asstes/images/' + obj.icon), text: obj.text }
            }),
            menu2: [{ i: 'icon_money.png', t: '我要贷款' },
            { i: 'icon_computed.png', t: '贷款计算' },
            { i: 'icon_zhishi.png', t: '知识' },
            { i: 'icon_sao.png', t: '扫一扫' }].map(obj => {
                return { icon: require('../../asstes/images/' + obj.i), text: obj.t }
            }),
            style: { margin: 0, marginBottom: '8px' },
            house: [],
            li: [],
            myCity: '定位中'
        }
    }
    async componentDidMount() {
        let _this = this
        setTimeout(() => {
            this.setState({
                data: ['1.jpg', '2.jpg', '3.jpg']
            })
        }, 500);

        let { data } = await getHouse()
        this.setState({
            house: data
        })
        let lists = document.querySelectorAll('.lists')
        let top = [...lists].map(v => {
            return v.offsetTop
        })
        this.setState({
            li: top.map((v, i) => {
                return { max: v, index: i }
            })
        })
        for (const v of this.state.li) {
            if (v.max <= document.querySelector('.hehe').offsetHeight) {
                lists[v.index].src = lists[v.index].getAttribute('data-sc')
            }
        }

        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    _this.setState({
                        myCity: cityinfo
                    })

                    //地图显示当前城市
                    // map.setBounds(citybounds);
                }
            } else {
                console.log(result.info);
            }
        });
        // new BScroll('.hehe', {
        //     click: true
        // })
    }

    render() {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }} className="hehe" onScroll={this.scol.bind(this)}>
                <div className="top-div">
                    <p onClick={this.changePage.bind(this, '/city')}>{this.state.myCity}▼</p>
                    <div className="search" onClick={this.changePage.bind(this, '/search')}>
                        <img src={require('../../asstes/images/search.png')} alt="" className="am-icon" />
                        <label>点击搜索好房</label>
                    </div>
                    <img src={require('../../asstes/images/place.png')} alt="" className="am-icon" onClick={this.changePage.bind(this, '/place')} />
                </div>
                <div style={{ flex: '0 0 200px', backgroundColor: '#108ee9' }}>
                    <Carousel
                        dots={false}
                        infinite
                        autoplay
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="#/"
                                doots='false'
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={require('../../asstes/images/'+val)}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top', height: '200px' }}
                                    key={val}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
                <Grid data={this.state.menu} hasLine={false} />
                <div className="house-box">
                    <h3>房产百科</h3>
                    <Grid data={this.state.menu2} hasLine={false} />
                </div>
                <div style={{ backgroundColor: "#fff", padding: "10px" }}>
                    <p style={{ margin: "0 0 10px 10px", color: "#f00", fontWeight: 'bold' }}>猜你喜欢</p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }} className="list">
                        {
                            this.state.house.map(obj =>
                                <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} key={obj.id} >

                                    <div style={{ display: 'flex' }}>
                                        <img data-sc={ip + obj.imgs} src={require('../../asstes/images/icom_username.png')} alt="" style={{ width: '100px', height: '90px' }} className="lists" onClick={this.addHouse.bind(this, obj)} />
                                        <div style={{ marginLeft: '10px' }}>
                                            <h3 style={this.state.style}>{obj.name}</h3>
                                            <p style={this.state.style}>
                                                <label>{obj.area}</label>
                                                &nbsp;
                                                <label>{obj.range}</label>
                                            </p>
                                            <p style={this.state.style}>

                                                <label>{obj.type}</label>
                                                &nbsp;
                                                <label>{obj.point}平</label>
                                            </p>
                                        </div>
                                    </div>
                                    <p style={{ alignSelf: 'center', margin: 0, color: '#f00', fontWeight: 'bold' }}>{obj.price}元/平</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div id="mymap" style={{ width: '200px', height: '200px' }}></div>
            </div>
        )
    }
    changePage(hash) {
        this.props.h.push(hash)
    }
    scol(e) {
        let y = e.target.scrollTop
        let lists = document.querySelectorAll('.lists')
        for (const v of this.state.li) {
            if (v.max - y + 20 <= document.querySelector('.hehe').offsetHeight) {
                lists[v.index].src = lists[v.index].getAttribute('data-sc')
            }
        }
    }
    addHouse(obj) {
        this.props.dispatch({
            type: 'add',
            obj
        })
    }
}
export default connect()(main)