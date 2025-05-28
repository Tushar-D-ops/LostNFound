import { useState,useEffect } from "react";
import logo from "../assets/logo.png";
import { gsap } from "gsap";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";


function Navbar({setToken}) {
  useEffect(() => {
    gsap.from("nav", {
      duration: 1,
      delay: 0.3,
      y: -100,
      opacity: 0,
      ease: "power2.out",
    });
  }, []);

  const [active, setActive] = useState(false);
  const [cls,setCls]=useState("inactive")

  const HandleLogout=()=>{
  localStorage.removeItem('token')
  
  toast.success("Logout Successfully")
  setTimeout(() => {
    window.location.href = '/'
  }, 1000);
}

  function openNav() {
     
    


    setActive(true)
   setCls("active")
    
  }
  function closeNav(){
    setActive(false)
    setCls("inactive")
  }
  return (
    <nav>
      <a href="/"><img src={logo} alt="" /></a>
      {/* <ul style={{ width: `${width}` }}> */}
      <ul className={cls}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/find">Find item</a>
        </li>
        <li>
          <a href="/post">Post item</a>
        </li>
        <li>
          <a href="/my-items">My Posted Items</a>
        </li>
        <li>
          <a href="/about">About us</a>
        </li>
        <button className="logout-button" onClick={()=>{HandleLogout()}} >Logout</button>
      </ul>
      {active ? (
        <button className="menu-container" onClick={closeNav}>
          <CloseIcon className="menu close" />
        </button>
      ) : (
        <button className="menu-container" onClick={openNav}>
          <MenuIcon className="menu" />
        </button>
      )}
    </nav>
  );
}
export default Navbar;
