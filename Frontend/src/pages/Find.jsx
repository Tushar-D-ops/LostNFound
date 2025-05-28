import React, { useState, useEffect } from "react";
import Itemcard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";

function Find({token,setToken}) {
  useEffect(() => {
    gsap.from(".lfh1", {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power2.out",
    });
  }, []);

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const api=process.env.REACT_APP_API;

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

  useEffect(() => {
    fetch(`${api}/api/item/getAll`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        setItem(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <main id="findpage">
      <Navbar setToken={setToken}/>
      <section>
        <h1 className="lfh1">Lost and Found Items</h1>
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
          {item.reverse().map((findItem, index) => {
            return (
              <Itemcard
                key={index}
                item={findItem}
              />
            );
          })}

          <div className="extraItem"></div>
          <div className="extraItem"></div>
          <div className="extraItem"></div>
        </div>
      </section>
    </main>
  );
}

export default Find;
