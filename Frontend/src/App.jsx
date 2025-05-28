import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Find from "./pages/Find"
import Post from "./pages/Post";
import Details from "./pages/Details";
import "./App.css"
import About from "./pages/About";
import { useEffect, useState } from "react";
import AuthForm from "./pages/AuthForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyItems from "./pages/MyItems";

function App() {
  

  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : "")
  //  const [token,setToken]=useState("A")
 useEffect(()=>{
  localStorage.setItem('token', token)
 },[token])


   return (
    <div>
      <ToastContainer/>

    {token===""?(

      <AuthForm token={token} setToken={setToken}/>
    ):(

<Routes>
      <Route path='/' element={<Home token={token} setToken={setToken}/>}  />
      <Route path='/find' element={<Find token={token} setToken={setToken} />}  />
      <Route path='/post' element={<Post token={token} setToken={setToken}/>}  />
      <Route path='/details/:id' element={<Details  token={token} setToken={setToken} />}  />
      <Route path='/about' element={<About token={token} setToken={setToken} />}  />
      <Route path='/my-items' element={<MyItems token={token} setToken={setToken} />}  />
    </Routes>
    )}
    </div>
    
      )
}

export default App;
