import React, { useContext } from 'react'
import CartCard from './CartCard'
import context from '../Context/Context'
import { Link } from 'react-router-dom';

function Cart() {

  let totalPrice = 0;

  var {cartItems} = useContext(context);

  return (
    <div className="container mt-3">

      <h1 className='text-center'>Your cart</h1>
      <hr />

      {
        cartItems && cartItems.map((singleCartItem) => {
          totalPrice += parseInt(singleCartItem.price);
          return <CartCard key = {singleCartItem._id} img = {singleCartItem.img} id = {singleCartItem._id} modelNumber = {singleCartItem.modelNumber} price = {singleCartItem.price}/>
        })
      }

      <hr />

      {cartItems.length !== 0 && <div className="d-flex justify-content-between">
        <h4 className='mb-0'>Total Payment : £{totalPrice}</h4>
        <Link className='btn btn-primary' to='/PlaceOrder'>Place your order</Link>
      </div>}

      {
        cartItems.length === 0 && <p className='text-center'>Your cart is empty</p>   
      }
    </div>
    
  )
}

export default Cart