import React , { useContext, useState } from 'react'
import Card from './watchCard'
import { useLocation } from 'react-router-dom';
import context from '../Context/Context';


function Shop() {

    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.pathname.slice(6))

    const handleChangeCategory = (categoryName) =>{
        setSelectedCategory(categoryName);
    } 

    var {watches, categories} = useContext(context);

    return (
        <div className="container text-center my-3">
            <h1>View our latest collection</h1>
            <hr />

            <div className="dropdown mb-2">
                <span className='mx-2'>Shop by category</span>
                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedCategory}
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type="button" onClick={()=>{handleChangeCategory("All")}}>All</button></li>
                    {categories.map((singleCategory) => {
                        return <li key = {singleCategory._id}><button className="dropdown-item" type="button" onClick={()=>{handleChangeCategory(singleCategory.categoryName)}}>{singleCategory.categoryName}</button></li>
                    })}
                </ul>
            </div>

            <div className="row">
                {watches.map((singleWatch) => {
                    return selectedCategory === "All" ? <Card key = {singleWatch._id} watchObject = {singleWatch}/> : (singleWatch.categoryName === selectedCategory) && <Card key = {singleWatch._id} watchObject = {singleWatch}/>
                })}
            </div>
        </div>
    )
}

export default Shop