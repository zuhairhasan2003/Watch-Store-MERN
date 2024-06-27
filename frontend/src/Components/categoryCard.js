import React from 'react'

function Card(props) {
    return (
        <div className="card my-2 mx-auto" style={{width : "18rem"}}>
            <img src={props.img} className="card-img-top mt-2" alt="" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a href= {`/Shop/${props.title}`} className="btn btn-primary">Explore Category</a>
            </div>
        </div>
    )
}

export default Card