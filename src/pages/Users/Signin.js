import React from 'react'
import {Link} from 'react-router-dom'

function Signin() {

  const serverUrl=process.env.REACT_APP_SERVER_URL;
    //console.log(serverUrl);
    //create state for form inputs
    const [email, setEmail] = React.useState("")
    const[password, setPassword] = React.useState('')
    const[username, setUsername] = React.useState('')

    const handleSignin = (e)=>{
      e.preventDefault();
    }


  return (
    <div className="sign-container">
        <form className="signup-form" onSubmit={handleSignin}>
            <div className="title-container">
                <h1>Sign In</h1>
                <p>Please fill in this form to login.</p>
            </div>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter email" 
                       onChange={(e)=>setEmail(e.target.value)}
                       value={email} id="email" required />
            </div>
            <div className="input-wrapper">
                <label htmlFor="psw">Password</label>
                <input type="password" placeholder="Enter password" 
                onChange={(e)=>setPassword(e.target.value)}
                value={password} id="psw" required />
            </div>
            
            <div className="button-container">
                <button type="reset" className="cancel-btn">Cancel</button>
                <button type="submit" className="sign-btn">Sign up</button>
            </div>
            <p className="sign-message">Don't have an account? &nbsp;
                <Link to="/signup" className="red-text">Signup</Link></p>
           
        </form>
    </div>
  )
}

export default Signin