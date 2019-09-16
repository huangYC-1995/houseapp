import React, { Component } from 'react'
import {Button } from 'antd-mobile';

export default class Chat extends Component {
    render() {
        return (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
                <div 
                style={{backgroundColor:'#fff',height:'300px',width:'350px',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
                    <img src={require('../../asstes/images/header.png')} alt="" style={{width:'100px',height:'100px'}}/>
                    <p>置业顾问:<span style={{fontWeight:'bold'}}>张晓梅</span></p>
                    <p>专业服务，诚信做人，诚心做事</p>
                    <Button type="primary" size="small">我要聊天</Button>
                </div>
            </div>
        )
    }
}
