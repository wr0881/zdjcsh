// import React, { Component } from 'react';

// class Bim extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         return (
//             <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
//                 <iframe title='bim' src="http://www.thingjs.com/demos/menu.html?name=silohouse" frameborder="0" width='100%' height='100%' />
//             </div>
//         );
//     }
// }

// export default Bim;
import React, { Component } from 'react'
import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
import 'antd/dist/antd.css'

export default class Bim extends Component {
  state = {
    socket: undefined
  }

  componentWillMount() {
    this.mywebsocket()
  }

  establishConnection = () => {
    this.mywebsocket()
  }

  mywebsocket = () => {
    const socket = new SockJs(`http://123.207.88.210:8180/webSocket`)

    /**
     * 建立成功的回调函数
     */
    socket.onopen = () => {
      console.log('open a connection')
    }

    /**
     * 服务器有消息返回的回调函数
     */
    socket.onmessage = e => {
      console.log('message', e.data)
    }

    /**
     * websocket链接关闭的回调函数
     */
    socket.onclose = () => {
      console.log('close')
    }

    const stompClient = Stomp.over(socket)
    // let info=[];
    // let sensor=[];
    // let error=[];
    stompClient.connect({}, frame => {
      console.log('Connected:' + frame)
      stompClient.subscribe(`/pushdata/dtudata`, data => {
        console.log(data)
      })
    })
  }

  render() {
    return <div>test</div>
  }
}