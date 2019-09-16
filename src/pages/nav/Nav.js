import React, { Component } from 'react'
import Main from '../main/Main'
import Chat from '../chat/Chat'
import History from '../history/History'
import My from '../my/My'
import { TabBar } from 'antd-mobile';
export default class Nav extends Component {
    constructor() {
        super()
        this.state = {
            routerPath: [
                { id: '1', path: '/nav/main', compon: Main, name: '首页', keys: 'main', icon: require('../../asstes/images/icon_index.png'), icon_s: require('../../asstes/images/icon_index_s.png') },
                { id: '2', path: '/nav/chat', compon: Chat, name: '微聊', keys: 'chat', icon: require('../../asstes/images/icon_chat.png'), icon_s: require('../../asstes/images/icon_chat_s.png') },
                { id: '3', path: '/nav/history', compon: History, name: '足迹', keys: 'history', icon: require('../../asstes/images/icon_history.png'), icon_s: require('../../asstes/images/icon_history_s.png') },
                { id: '4', path: '/nav/my', compon: My, name: '我的', keys: 'my', icon: require('../../asstes/images/icon_my.png'), icon_s: require('../../asstes/images/icon_my_s.png') },
            ],
            selectedTab:'main'
        }
    }
    renderContent(Page) {
        return (
            <Page />
        )
    }
    render() {
        return (

            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar tabBarPosition="bottom">
                    {
                        this.state.routerPath.map(obj =>
                            <TabBar.Item title={obj.name} icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(' + obj.icon + ') center center /  21px 21px no-repeat'
                                }}
                                />
                            }
                                selectedIcon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(' + obj.icon_s + ') center center /  21px 21px no-repeat'
                                    }}
                                    />
                                } onPress={() => {
                                    this.setState({
                                        selectedTab: obj.keys
                                    })
                                    window.location.hash = obj.path;
                                }} selected={this.state.selectedTab === obj.keys}
                                key={obj.keys}>{<obj.compon h={this.props.history}/>}
                                </TabBar.Item>
                        )
                    }
                </TabBar>
            </div>
        )
    }
}
