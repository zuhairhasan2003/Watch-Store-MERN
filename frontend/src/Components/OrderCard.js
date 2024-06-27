import React, { useContext } from 'react'
import context from '../Context/Context'


function OrderCard(props) {

    let { markFulfilled } = useContext(context);
    return (
        <div className="card col-md-4 my-2 mx-auto" style={{"width": "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.watchId}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.customerName}</h6>
                <p className="card-text">{props.customerAddress}</p>
                <p className="card-text">{props.customerEmail}</p>
                <p className="card-text">{props.customerContact}</p>
                <button className="btn btn-primary card-link" onClick={()=>{markFulfilled(props.orderObject._id)}}>Mark as fulfilled</button>
            </div>
        </div>
    )
}

export default OrderCard