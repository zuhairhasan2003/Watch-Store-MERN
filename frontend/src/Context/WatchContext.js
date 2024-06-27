import React, { useEffect, useState } from "react";
import Context from "./Context";



function WatchState(props) {


  const [watches, setWatches] = useState([]);

  useEffect(() => {
    getAllWatches()
    getAllCategoreis()
  }, [])



  const [categories, setcategories] = useState([])

  const [cartItems, setcartItems] = useState([])

  const [unfulfilledOrders, setUnfulfilledOrders] = useState([])

  const addToCart = (item) => {
    let mid = cartItems;
    mid.push(item);
    setcartItems(mid);
  }

  const removeFromCart = (id) => {
    let tempCart = cartItems.filter((item) => item._id !== id);
    setcartItems(tempCart);
  }

  const adminLoginRequest = async (email, password, secret) => {

    let data = {
      "email": email,
      "password": password,
      "secret": secret
    }

    let response = await fetch('http://localhost:5000/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      localStorage.setItem('admin-auth-token', await response.text());
      window.open('/AdminPortal', '_self')
    }
    else {
      alert('Invalid details');
    }
  }

  const adminAuth = async () => {

    let response = await fetch('http://localhost:5000/admin/getAdmin', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'admin-auth-token': localStorage.getItem('admin-auth-token')
      }
    })

    if (response.status !== 200) {
      localStorage.removeItem('admin-auth-token')
    }
  }

  const addWatch = async (modelNumber, description, price, quantity, categoryName, img) => {

    let data = {
      modelNumber: modelNumber,
      description: description,
      price: price,
      quantity: quantity,
      categoryName: categoryName,
      img: img
    }

    let response = await fetch('http://localhost:5000/admin/addWatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-auth-token': localStorage.getItem('admin-auth-token')
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      console.log(img);
      alert('New watch uploded to the store');
    }
    else {
      alert(await response.text());
    }
  }


  const getAllWatches = async () => {
    let response = await fetch('http://localhost:5000/watches/allWatches');
    let jsonResponse = await response.json();
    setWatches(jsonResponse);
  }

  const getAllCategoreis = async () => {
    let response = await fetch('http://localhost:5000/category/allCategories');
    let jsonResponse = await response.json();
    setcategories(jsonResponse);
  }

  const getUnfulfilledOrders  = async() =>{
    let response = await fetch('http://localhost:5000/admin/unfulfilledOrders' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'admin-auth-token': localStorage.getItem('admin-auth-token')
      }
    });
    if(response.status === 200){
      let jsonResponse = await response.json();
      setUnfulfilledOrders(jsonResponse)
    }
    else{
      alert(await response.text())
    }
  }

  const addCategory = async (categoryName, description, img) => {
    const data = {
      categoryName: categoryName,
      description: description,
      img: img
    }
    let response = await fetch('http://localhost:5000/category/addCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-auth-token': localStorage.getItem('admin-auth-token')
      },
      body: JSON.stringify(data)
    })

    alert(await response.text());
  }

  const placeOrder = async (watchId, customerName, customerEmail, customerContact, customerAddress) =>{

    let data = {
      watchId : watchId,
      customerName: customerName,
      customerEmail : customerEmail, 
      customerContact : customerContact,
      customerAddress : customerAddress
    }

    let response = await fetch('http://localhost:5000/watches/buy' , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    });

    alert(await response.text())
  }

  const markFulfilled = async (orderId) =>{
    const data = {
      orderId: orderId
    }
    let response = await fetch('http://localhost:5000/admin/fulfillOrder' , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'admin-auth-token': localStorage.getItem('admin-auth-token')

      },
      body : JSON.stringify(data)
    })
    alert(await response.text())
  }

  return (
    <Context.Provider value={{ watches, categories, cartItems, addToCart, removeFromCart, adminLoginRequest, adminAuth, addWatch, getAllWatches, addCategory , placeOrder , getUnfulfilledOrders, unfulfilledOrders, markFulfilled}}>
      {props.children}
    </Context.Provider>
  )
}

export default WatchState;