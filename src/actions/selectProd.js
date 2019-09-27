
export const UPDATE = "updateproduct"
export const ADD = "addproduct"
export const ON = "turn on "
export const OFF = "turn off "



export const addproduct = (product, qty) => ({ type: ADD, payload: { product, qty } })

export const updateproduct = (product, qty) => ({ type: UPDATE, payload: { product, qty } })


export const turnOFFUpdate = (product) => ({ type: OFF, payload: { product } })

export const turnONUpdate = (product) => ({ type: ON, payload: { product } })