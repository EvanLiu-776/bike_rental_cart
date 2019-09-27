import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

export class CheckoutPage extends Component {

    state = { checkout: false, formErrors: { fullname: "cannot be empty", address: "cannot be empty", city: "cannot be empty", email: "cannot be empty", state: "cannot be empty", zip: "cannot be empty" } }


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        this.validateField(name, value);
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = { ...this.state.formErrors };
        switch (fieldName) {
            case 'email':
                let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'fullname':
                let fullnameValid = value.length > 0;
                fieldValidationErrors.fullname = fullnameValid ? '' : ' cannot be empty';
                break;
            case 'address':
                let addressValid = value.length > 0;
                fieldValidationErrors.address = addressValid ? '' : ' cannot be empty';
                break;
            case 'city':
                let cityValid = value.length > 0;
                fieldValidationErrors.city = cityValid ? '' : ' cannot be empty';
                break;
            case 'state':
                let stateValid = value.length === 2;
                fieldValidationErrors.state = stateValid ? '' : ' is invalid';
                break;
            case 'zip':
                let zipValid = value.length >= 5;
                fieldValidationErrors.zip = zipValid ? '' : ' is invalid';
                break;

            default:
                break;
        }
        this.setState({ formErrors: fieldValidationErrors })

    }


    render() {
        let { selectProducts } = this.props;
        let { formErrors } = this.state;
        return (selectProducts.length > 0 && <div className="app">
            <div className="checkout-page ">
                <div class="cart-container">
                    <h4>Cart</h4>
                    <br />
                    <table>
                        {selectProducts.map((selProd) => (<tr><td>{selProd.name}</td><td>${selProd.price}</td><td>qty:{selProd.qty}</td></tr>))}
                    </table>
                    <hr />
                    <br />
                    <p style={{ textAlign: "right", fontWeight: "bolder" }}>TOTAL: ${selectProducts.reduce((accu, curr) => (accu + (curr.price) * parseInt(curr.qty)), 0).toFixed(2)}</p>

                </div>
                <div className="checkout-form">
                    <form action="/action_page.php">
                        <div class="form-container">
                            <div class="half">
                                <h4>Contact Info.</h4>
                                <label for="fullname"> Full Name</label>
                                <input type="text" id="fullname" name="fullname" value={this.state.fullname} onChange={this.handleUserInput} />
                                <label for="email"> Email</label>
                                <input type="text" id="email" name="email" size="25" value={this.state.email} onChange={this.handleUserInput} />
                                <label for="adr"> Street Address</label>
                                <input type="text" id="adr" name="address" size="30" value={this.state.address} onChange={this.handleUserInput} />
                                <div class="row">
                                    <div class="form-part">
                                        <label for="city">City</label>
                                        <input type="text" id="city" name="city" value={this.state.city} onChange={this.handleUserInput} />
                                    </div>
                                    <div class="form-part">
                                        <label for="state">State</label>
                                        <input type="text" id="state" name="state" placeholder="NY" size="2" value={this.state.state} onChange={this.handleUserInput} />
                                    </div>
                                    <div class="form-part">
                                        <label for="zip">Zip</label>
                                        <input type="text" id="zip" name="zip" placeholder="10001" size="5" value={this.state.zip} onChange={this.handleUserInput} />
                                    </div>
                                </div>
                            </div>


                            <div class="half">
                                <h4>Payment</h4>
                                <label for="ccnum">Credit card number</label>
                                <input type="text" id="ccnum" name="cardnumber" size="20" />


                                <label for="cname">Name on Card</label>
                                <input type="text" id="cname" name="cardname" />
                                <div className="row">
                                    <div className="form-part">
                                        <label for="expmonth">Expiration Date</label>
                                        <input style={{ display: "inline-block", marginTop: "0" }} type="text" id="expmonth" name="expmonth" placeholder="01" size="2" />
                                        <input style={{ display: "inline-block", marginTop: "0" }} type="text" id="expyear" name="expyear" placeholder="20xx" size="4" /></div>
                                    <div className="form-part"><label for="cvv">CVV</label>
                                        <input type="text" id="cvv" name="cvv" size="3" /></div>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div className='formErrors' >
                <ul style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {Object.keys(formErrors).map((fieldName, i) => {
                        if (formErrors[fieldName].length > 0) {
                            return (

                                <li key={i} style={{ color: "red", margin: "5px 0" }}>{fieldName} {formErrors[fieldName]}</li>
                            )
                        } else {
                            return '';
                        }
                    })}
                </ul>
            </div>
            <div style={{ textAlign: "center" }}>
                {Object.keys(formErrors).filter(key => formErrors[key] !== "").length === 0 && <Link to="/confirm"><button className="checkout" style={{ fontSize: "20px", padding: "10px 20px" }}>CONFIRM</button></Link>}

            </div>
        </div>)



    }
}

const mapStateToProps = (state) => ({
    selectProducts: state.selectProducts
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
