import React, { useContext } from 'react'
import context from '../Context/Context'


function CartCard(props) {

    const {removeFromCart} = useContext(context);

    return (
        <div className="card mb-3" style={{maxWidth: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.img} style={{height: '250px'}} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title mb-0">{props.modelNumber}</h5>
                        <p className="card-text">£{props.price}</p>
                        <button className='btn btn-secondary btn-sm' onClick={()=>{removeFromCart(props.id)}} style={{fontSize: "0.7rem"}}>Remove from cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard