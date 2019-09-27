import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateproduct, turnOFFUpdate, turnONUpdate } from "../actions/selectProd";


export class CartItem extends Component {
    state = { showChange: true, qty: 0 }

    componentDidMount() {
        this.setState({ qty: this.props.product.qty })
    }

    componentDidUpdate(oldProps) {
        if (oldProps.product.qty !== this.props.product.qty) {
            this.setState({ qty: this.props.product.qty })
        }
    }

    onChange = (e) => {
        let inputValue = e.target.value.trim();

        if (/^(0|[1-9]\d*|\s*)$/.test(inputValue)) {
            this.setState({ qty: inputValue })
        }
    }
    render() {
        const { product, updateproduct, turnOFFUpdate, turnONUpdate } = this.props;
        const { qty } = this.state;
        return (
            <div className="cartitem">
                <div className="image-container">
                    <img src={product.image} alt="" />
                </div>
                <p style={{ overflow: "hidden", maxWidth: "90%", borderBottom: "1px solid grey" }}>
                    {product.name}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center" }}>
                    <span>qty:
        <span>{product.showUpdate ? <input value={qty} onChange={this.onChange} onClick={e => e.stopPropagation()} size="2" /> : product.qty}</span>
                    </span>
                    <span>
                        {product.showUpdate ? <button style={{ backgroundColor: "blue" }} onClick={e => { updateproduct(product, qty); turnOFFUpdate(product) }}>update</button> : <button onClick={e => { turnONUpdate(product); e.stopPropagation() }}>change</button>}
                    </span>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    showChange: state.showChange
})

const mapDispatchToProps = {
    updateproduct, turnOFFUpdate, turnONUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
