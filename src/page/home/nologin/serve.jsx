import React, { Component } from 'react';
import icon from 'common/image/icon.png';
import ServeItem from 'component/serveitem/serveitem';

class Serve extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="serve">
                <div className='serve-title'>我们的服务</div>
                <div className="serve-content">
                    <ServeItem value={{ title: '大数据', img: icon, dec: 'dlsjflsjflsjflsdlnv旧世界打个傻瓜机大案举国拉萨就够了就是两个静安寺；杰哥就是' }} />
                    <ServeItem value={{ title: '可视化', img: icon, dec: 'agasga第三个撒噶是噶是噶是个萨嘎啊噶时光恍惚是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时光' }} />
                    <ServeItem value={{ title: '云计算', img: icon, dec: 'dlsjflsjsjflsjflsdlnv旧世界打个傻瓜机sjflsjflsdlnv旧世界打个傻瓜机' }} />
                    <ServeItem value={{ title: '数据智能', img: icon, dec: '啊噶时光恍惚是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时啊噶时光恍惚是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时啊噶时光恍惚是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时啊噶时光恍惚是噶是噶是个萨嘎啊噶时光是噶是噶是个萨嘎啊噶时' }} />
                    <ServeItem value={{ title: '物联网', img: icon, dec: 'ss缴费记录数据分类李经理岗位管理你就撒娇偶分家里的你是个大设计感的嘎松价格来当六年哦杀光了你是个' }} />
                </div>
            </div>
        );
    }
}

export default Serve;