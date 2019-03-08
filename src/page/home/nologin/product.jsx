import React, { Component } from 'react';
import classnames from 'classnames';
import ProductItem from 'component/productitem/productitem';
import yunchanping from 'common/image/云产品.svg';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickTab: 'tab1'
        }
    }
    render() {
        return (
            <div className="product">
                <div className="product-title">
                    <div className="product-title-name">我们的平台</div>
                    <div className="product-title-content">
                        <div
                            className={classnames('product-title-item', { 'product-title-item-click': this.state.clickTab === 'tab1' })}
                            onClick={_ => { this.setState({ clickTab: 'tab1' }) }}
                        >
                            <img src={yunchanping} alt="" />
                            <div>云服务</div>
                        </div>
                        <div
                            className={classnames('product-title-item', { 'product-title-item-click': this.state.clickTab === 'tab2' })}
                            onClick={_ => { this.setState({ clickTab: 'tab2' }) }}
                        >
                            <img src={yunchanping} alt="" />
                            <div>云产品</div>
                        </div>
                    </div>
                </div>
                <div className="product-content">
                    <div className="product-content-item">
                        <div className="product-content-item1"
                            style={{ display: this.state.clickTab === 'tab1' ? 'flex' : 'none' }}
                        >
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='道路' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                        </div>
                        <div className="product-content-item2"
                            style={{ display: this.state.clickTab === 'tab2' ? 'flex' : 'none' }}
                        >
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                            <ProductItem text='桥梁' dec='是目前湖南省试验检测资质齐全、技术实力雄 厚的工程检测试验机构' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;