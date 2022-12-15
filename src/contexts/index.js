import  ThemeContextProvider  from "./ThemeContext";
import  UserContextProvider  from "./UserContext";

import React from 'react'

//provides values to all the children of these components

function ContextReducer(props) {
    //do the "wrapping" here

  return (
    <ThemeContextProvider>
        <UserContextProvider>
            {props.children}
        </UserContextProvider>
    </ThemeContextProvider>
  )
}

export default ContextReducer