import React, { useContext } from 'react'
import context from '../Context/Context'


function AdminLogin() {

    let {adminLoginRequest} = useContext(context)

    const handleLoginRequest = () =>{
        let email = document.querySelector('#floatingInputEmail').value;
        let password = document.querySelector('#floatingPassword').value;
        let secret = document.querySelector('#floatingSecret').value;

        adminLoginRequest(email, password, secret);
        
    }

    return (
        <div className="container my-3">
            <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating my-3">
                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                    <label htmlFor="floatingInputEmail">Email address</label>
                </div>
                <div className="form-floating my-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingSecret" placeholder="Password" />
                    <label htmlFor="floatingSecret">Admin secret</label>
                </div>
                <button className="btn btn-primary w-100 py-2" onClick={(e)=>{e.preventDefault();handleLoginRequest()}}>Sign in</button>
            </form>
        </div>
    )
}

export default AdminLogin