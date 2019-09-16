import React, { Component } from 'react'

export default class Place extends Component {
    componentDidMount() {
        var map = new window.AMap.Map("mymap", {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 13
        });
        console.log(window.AMap.Marker);
        
        var marker = new window.AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [116.406315,39.908775],
            offset: new window.AMap.Pixel(-13, -30)
        });
        // var marker = new window.AMap.Map("mymap", {
        //     resizeEnable: true,
        //     center: [116.397428, 39.90923],
        //     zoom: 13
        // });

        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var citybounds = result.bounds;

                    //地图显示当前城市
                    map.setBounds(citybounds);
                }
            } else {
                console.log(result.info);
            }
        });
    }
    render() {
        return (
            <div id="mymap" style={{ height: '50%' }}>
                {/* 定位 */}
            </div>
        )
    }
}
