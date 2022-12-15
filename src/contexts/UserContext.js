import React, {useState, createContext} from 'react'
export const UserContext = createContext();


function UserContextProvider(props) {

    //create state
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')

    React.useEffect(
        ()=>{
            //get info from local storage
            setToken(localStorage.getItem('token'))
            setUser(JSON.parse(localStorage.getItem('userInfo')))

        }, []
    )

  return (
    <UserContext.Provider value={{user, setUser, token, setToken}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider