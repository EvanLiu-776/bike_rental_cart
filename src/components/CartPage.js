import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../App.css"
import getProducts from "../_data";
import CartItem from "./CartItem";
import ProductItem from "./ProductItem";
import Select from 'react-select';
import { Link } from "react-router-dom";
import { turnOFFUpdate } from "../actions/selectProd";

export class CartPage extends Component {

  state = {
    keyword: "", selTypes: [], types: [], typeOptions: [], products: [], phHeight: 0, pageWidth: 0, pageHeight: 0
  }//random number is useless in itself, it is used to trigger the update of component 
  componentDidMount() {
    const products = getProducts().sort((a, b) => (a.product_type.localeCompare(b.product_type)));

    let types = [products[1].product_type];
    for (let index = 0; index < products.length - 1; index++) {
      if (products[index].product_type !== products[index + 1].product_type) {
        types.push(products[index + 1].product_type)
      };
    }

    const typeOptions = types.map((type) => ({ value: type, label: type }))

    this.setState({ products, types, typeOptions, selTypes: typeOptions });

    window.addEventListener("resize", e => {
      this.setState({
        pageHeight: document.getElementsByClassName("products")[0].offsetHeight,
        pageWidth: document.getElementsByClassName("products")[0].offsetWidth
      })
    });
  }

  componentDidUpdate(preProps, preState) {
    let changeCondition = (preProps.selectProducts.length !== this.props.selectProducts.length) ||
      (preState.pageHeight !== this.state.pageHeight) ||
      (preState.pageWidth !== this.state.pageWidth)


    if (changeCondition) {
      if (this.props.selectProducts.length === 0) {
        this.setState({ phHeight: 0 })
      } else {
        console.log(document.getElementsByClassName("cart")[0].offsetHeight);
        this.setState({ phHeight: document.getElementsByClassName("cart")[0].offsetHeight + 20 })
      }
    }//to calculate the height of the placeholder
  }

  handleChange = (optList) => {
    this.setState({ selTypes: optList || [] })
  }

  render() {
    let { selectProducts, turnOFFUpdate } = this.props;
    let { selTypes, keyword } = this.state;
    return (
      <div className="app" onClick={e => {
        selectProducts.forEach(element => {
          turnOFFUpdate(element)
        });
      }}>
        <div className="Header">
          <div className="label">
            <label >FILTER:</label>
          </div>

          <div className="filter type">
            <Select
              value={this.state.selTypes}
              onChange={this.handleChange}
              options={this.state.typeOptions}
              isMulti={true}
              noOptionsMessage={() => "That's all we got"}
            />
          </div>

          <div>
            <input class="filter keyword" placeholder="Search for keywords..." onChange={e => this.setState({ keyword: e.target.value.trim() })} />
          </div>

        </div>

        <div className="products" >

          {this.state.types.filter(type => selTypes.map(selType => (selType.value)).indexOf(type) > -1).map((type) => (
            <div className="products-sect" key={type}>
              <h3>{type.toUpperCase()}</h3>
              <div className="products-list" key={type}>
                {this.state.products.filter(product => new RegExp(keyword, "i").test(product.name)).filter((product) => product.product_type === type).map((product) => (
                  <ProductItem product={product} key={product.id} />
                ))}
              </div>
            </div>
          ))}

        </div>
        <div className="placeholder" style={{ height: this.state.phHeight }}></div>
        {selectProducts.length > 0 && <div className="cart">
          <h4>CART</h4>
          <div className="cart-list">
            {selectProducts.map((selPrudct) => (
              <CartItem product={selPrudct} />
            ))}
          </div>
          <div id="total">
            <span >TOTAL:${selectProducts.reduce((accu, curr) => (accu + (curr.price) * parseInt(curr.qty)), 0).toFixed(2)}</span>
            <span>{selectProducts.filter((prod) => prod.product_type === "bike").length > 0 ? <Link to="checkout"><button className="checkout">Checkout</button></Link> : <p style={{ fontStyle: "oblique", color: "grey", fontWeight: "700", fontSize: "12px" }}>*cannot check out with accessories or add-ons only - they must come with a bike selection"</p>}</span>
          </div>
        </div>
        }
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  selectProducts: state.selectProducts
})

const mapDispatchToProps = {
  turnOFFUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)

