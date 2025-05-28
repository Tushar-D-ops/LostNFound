// src/pages/MyItems.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Itemcard from "../components/ItemCard"; // adjust the path as per your structure
import "../App.css"
import Navbar from "../components/Navbar";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
const MyItems = ({token,setToken}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      AOS.init({ duration: 750 });
    }, []);

  const override = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  const api=process.env.REACT_APP_API;
  const fetchMyItems = async () => {
    try {
      

      const response = await axios.get(api+"/api/item/my-items", {
        headers: {
          token: token,
        },
      });
      
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user items:", error);
      setLoading(false);
    }
  };


  const HandleDelete= async(id)=>{
    try {
      await axios.delete(api+"/api/item/delete/"+id,{headers: {token}});
      fetchMyItems();
      toast.success("Item Deleted Successfully")
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    
  <main id="findpage">
    <Navbar setToken={setToken} />

    <section>
      <h1 className="lfh1">Your Posted Items</h1>
      <div className="pink-gradient"></div>
      <div className="blue-gradient"></div>
      <div className="white-gradient"></div>

      <div className="item-container">
        <HashLoader
          color="04b2fd"
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

        {!loading && items.length === 0 && (
          <h1 className="lfh1">No Items Posted By You</h1>
        )}

        {!loading && items.length > 0 &&
          items.map((findItem, index) => (
            <div key={index}>
            <Itemcard  item={findItem} />
            <button onClick={() => {HandleDelete(findItem._id)}} className="delete-button">Delete</button>
            </div>
          ))}

        <div className="extraItem"></div>
        <div className="extraItem"></div>
        <div className="extraItem"></div>
      </div>
    </section>
  </main>
);


  
};

export default MyItems;
