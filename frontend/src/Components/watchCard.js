import React, { useContext } from 'react'
import context from '../Context/Context';


function Card(props) {
    const {addToCart} = useContext(context);

    const handleAddToCart = (item) =>{
        addToCart(item);
        alert("item added to cart");
    }

    return (
        <div className="card my-2 mx-auto" style={{width : "18rem"}}>
            <img src={props.watchObject.img} className="card-img-top mt-2" alt="" />
            <div className="card-body">
                <h5 className="card-title mb-0">{props.watchObject.modelNumber}</h5>
                <p className='mb-0'>£{props.watchObject.price}</p>
                <p className='mb-0'>{props.watchObject.categoryName} Collection</p>
                <p className="card-text">{props.watchObject.description}</p>
                <button onClick={()=>{handleAddToCart(props.watchObject)}} className="btn btn-primary">Add to cart</button>
            </div>
        </div>
    )
}

export default Card