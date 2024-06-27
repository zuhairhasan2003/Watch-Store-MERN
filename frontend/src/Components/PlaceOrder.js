import React, { useContext } from 'react'
import context from '../Context/Context'

function PlaceOrder() {

    let {cartItems , placeOrder} = useContext(context);

    const handlePlaceOrder = (event) =>{

        event.preventDefault();

        let customerName = document.querySelector('#customerNameInput').value;
        let customerEmail = document.querySelector('#customerEmailInput').value;
        let customerContact = document.querySelector('#customerContactInput').value;
        let customerAddress = document.querySelector('#customerAddressInput').value;

        cartItems.forEach(cartElement => {
            placeOrder(cartElement._id, customerName, customerEmail, customerContact, customerAddress);
        });
    }

    return (
        <div className="container my-3">
            <h3 className=' text-center '>Enter your details</h3>

            <form>

                <label htmlFor="customerNameInput" className="form-label">Name</label>
                <input type="text"  id='customerNameInput' className="form-control mb-2" aria-describedby="passwordHelpBlock"/>

                <label htmlFor="customerEmailInput" className="form-label">Email</label>
                <input type="email"  id='customerEmailInput' className="form-control mb-2" aria-describedby="passwordHelpBlock"/>

                <label htmlFor="customerContactInput" className="form-label">Contact number</label>
                <input type="text"  id='customerContactInput' className="form-control mb-2" aria-describedby="passwordHelpBlock"/>

                <label htmlFor="customerAddressInput" className="form-label">Shipping address</label>
                <input type="text"  id='customerAddressInput' className="form-control mb-2" aria-describedby="passwordHelpBlock"/>

                <button className="btn btn-primary mt-2" onClick={handlePlaceOrder}>Confirm</button>
            </form>
        </div>
    )
}

export default PlaceOrder