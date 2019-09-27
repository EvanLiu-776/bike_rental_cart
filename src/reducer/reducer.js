import { combineReducers } from "redux";
import { UPDATE, ADD, ON, OFF } from "../actions/selectProd";

const selectProdReducer = (state = [], { type, payload }) => {//payload:{product:product object, qty:int}
    switch (type) {

        case UPDATE:
            return state.reduce((result, curr) => {
                if (curr.id === payload.product.id) {
                    if (["0", ""].indexOf(payload.qty) === -1) {
                        result.push({ ...curr, qty: parseInt(payload.qty) })
                    }
                } else {
                    result.push(curr)
                }
                return result
            }, [])

        case ADD:
            let hasInCart = false;
            let newstate = state.map((oldProduct) => {
                if (oldProduct.id === payload.product.id) {
                    hasInCart = true;
                    return { ...oldProduct, qty: parseInt(oldProduct.qty) + parseInt(payload.qty) }
                } else {
                    return oldProduct
                }
            })
            return hasInCart ? newstate : [...newstate, { ...payload.product, qty: payload.qty }]

        case ON:
            return state.reduce((result, curr) => {
                if (curr.id === payload.product.id) {
                    result.push({ ...curr, showUpdate: true })
                } else {
                    result.push(curr)
                }
                return result
            }, [])

        case OFF:
            return state.reduce((result, curr) => {
                if (curr.id === payload.product.id) {
                    result.push({ ...curr, showUpdate: false })
                } else {
                    result.push(curr)
                }
                return result
            }, [])
        default:
            return state
    }
}


export default combineReducers({ selectProducts: selectProdReducer });

