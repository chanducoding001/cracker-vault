import { Navigate, Outlet } from 'react-router-dom';
import useAuthenticateCheck from '../src/auth/useAuthenticateCheck';

const HomeRedirect = () => {
  // const { isLoggedIn,setIsLoggedIn,user,setUser } = useAuthenticateCheck();
  const user = localStorage.getItem("user");
//   const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to="/" replace />;
    // return <Outlet />;
  }
  // if (!user) {
  //   console.log("User not found in localStorage, redirecting to login.");
  //   return <Navigate to="/login" replace />;
  // }
  // console.log("after if user",user);
//   if (!user?.token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role === "admin") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   if (user.role === "user") {
//     return <Navigate to="/user/dashboard" replace />;
//   }

return <Outlet/>;
//   return <Navigate to="/" replace />;
  // return <Navigate to="/login" replace />;

}

export default HomeRedirect;