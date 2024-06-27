import React, { useContext, useEffect, useState } from 'react'
import context from '../Context/Context'
import OrderCard from './OrderCard';

function AdminPortal() {

    let { addWatch, categories, addCategory , getUnfulfilledOrders, unfulfilledOrders } = useContext(context);

    const [imgToUpload, setImgToUpload] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('admin-auth-token')) {
            window.open('/', '_self');
        }
        getUnfulfilledOrders()
        // eslint-disable-next-line
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('admin-auth-token');
        window.open('/', '_self');
    }

    const convertToBase64 = (event) => {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImgToUpload(reader.result);
        }
    }

    const handleAddWatch = () => {

        let selectElement = document.querySelector('#inputGroupSelect01');
        let output = selectElement.options[selectElement.selectedIndex].innerText;

        let modelNumber = document.querySelector('#modelNumberInput').value
        let description = document.querySelector('#descriptionInput').value;
        let price = document.querySelector('#priceInput').value;
        let quantity = parseInt(document.querySelector('#quantityInput').value);
        let categoryName = output;
        let img = imgToUpload;

        addWatch(modelNumber, description, price, quantity, categoryName, img);
    }

    const handelAddCategory = () =>{
        let categoryName = document.querySelector('#categoryNameInput').value;
        let description = document.querySelector('#categoryDescriptionInput').value;
        let img = imgToUpload;

        addCategory(categoryName, description, img);
    }


    return (
        <div className="container">
            <h1 className="text-center my-3">Admin Portal</h1>
            <button className="btn btn-primary mx-auto" onClick={handleLogout}>Logout</button>

            <div>
                <hr />
                <h2>Add a watch</h2>
                <form>
                    <div className="input-group mb-3">
                        <input id='modelNumberInput' type="text" className="form-control" placeholder="Model Number" aria-label="Model Number" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input id='descriptionInput' type="text" className="form-control" placeholder="description" aria-label="description" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Category name</label>
                        <select className="form-select" id="inputGroupSelect01">
                            {categories && categories.map((singleCategory) => {
                                return <option>{singleCategory.categoryName}</option>
                            })}
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">£</span>
                        <input id='priceInput' type="number" placeholder='price' className="form-control" aria-label="Amount (to the nearest pound)" />
                        <span className="input-group-text">.00</span>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">quantity</span>
                        <input type="number" id='quantityInput' className="form-control" />
                    </div>

                    <div className="input-group mb-3">
                        <input type="file" accept='image' className="form-control" id="inputGroupFile02" onChange={convertToBase64} />
                    </div>

                    <button className="btn btn-primary" onClick={handleAddWatch}>Add to store</button>
                </form>

                <hr />

                <h2>Add a category</h2>

                <form>
                    <div className="input-group mb-3">
                        <input id='categoryNameInput' type="text" className="form-control" placeholder="Category Name" aria-label="Model Number" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input id='categoryDescriptionInput' type="text" className="form-control" placeholder="description" aria-label="description" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="file" accept='image' className="form-control" id="inputGroupFile03" onChange={convertToBase64} />
                    </div>

                    <button className="btn btn-primary" onClick={handelAddCategory}>Add to store</button>
                </form>

                <hr />

                <h2 className='text-center mt-4'>Unfulfilled orders</h2>
                <div className='row'>
                    {
                        unfulfilledOrders && unfulfilledOrders.map((singleOrder) => {
                            return <OrderCard key={singleOrder._id} orderObject = {singleOrder} watchId = {singleOrder.watchId} customerName = {singleOrder.customerName} customerAddress = {singleOrder.customerAddress} customerEmail = {singleOrder.customerEmail} customerContact = {singleOrder.customerContact}/>
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default AdminPortal