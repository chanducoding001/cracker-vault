import { useState } from 'react'

const useAuthenticateCheck = () => {
//   const user = localStorage.getItem("user");
    const [user,setUser] = useState(localStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(user !== null);

    return { isLoggedIn,setIsLoggedIn,user,setUser };
}

export default useAuthenticateCheck;