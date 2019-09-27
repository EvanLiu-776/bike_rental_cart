import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addproduct } from "../actions/selectProd";

export class ProductItem extends Component {
    state = { qty: 1 }

    render() {
        const { product, addproduct } = this.props;
        return (
            <div className="product-container">
                <div className="img-container">
                    <img src={product.image} alt="" />
                </div>
                <div className="prduct-detail">
                    <div>
                        <p className="name">{product.name}</p>
                    </div>
                    <div >
                        <span className="price"> ${product.price} </span>
                        <span className="qty">Qty:
                        <select name="" id="" onChange={e => this.setState({ qty: e.target.value })} value={this.state.qty}>
                                {Object.keys(Array(10).fill(0)).map(key => <option value={parseInt(key) + 1} >{parseInt(key) + 1}</option>)}
                            </select>
                        </span>
                    </div>
                    <div>
                        <button onClick={e => addproduct(product, this.state.qty)}> Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    addproduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
