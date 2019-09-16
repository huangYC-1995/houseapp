import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ip } from '../../asstes/api/api'
class History extends Component {
    constructor() {
        super()
        this.state = {
            style: { margin: 0, marginBottom: '8px' },
        }
    }
    render() {
        return (
            <div style={{ height: '100%', padding: '0 10px', overflow: 'auto' }}>
                <p style={{ margin: 0, lineHeight: '50px', fontWeight: 'bold', fontSize: '20px', color: '#f00' }}>我的足迹</p>
                <p style={ this.props.houseArr.length===0?{display:'block',textAlign:'center'}:{display:'none'}}>空空如也...</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {
                        this.props.houseArr.map(obj => {
                            return <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} key={obj.id} >

                                <div style={{ display: 'flex' }}>
                                    <img src={ip + obj.imgs} alt="" style={{ width: '100px', height: '90px' }} className="lists" />
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
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default connect((store) => {
    return { houseArr: store.houseArr }
})(History)
