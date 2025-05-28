import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useParams } from "react-router-dom";

import HashLoader from "react-spinners/HashLoader";
import noimg from "../assets/no-image.png";

function Details({token, setToken}) {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
 
  const api=process.env.REACT_APP_API;


  const override = {
    display: "block",
    borderColor: "#fdf004",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${api}/api/item/getOne/${id}`)
      .then((response) => response.json())
      .then((data) => {
        
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <main id="detailspage">
      <Navbar setToken={setToken}/>
      <section>
        <div className="pink-gradient"></div>
        <div className="blue-gradient"></div>
        <div className="white-gradient"></div>
        {loading ? (
          <HashLoader
            color="04b2fd"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          item && (
            <div className="details-card">
              <div className="img-container">
                <img
                  src={item.image}
                  alt="Item"
                  
                />
              </div>

              <div className="action-container">
                <a href={`tel:${item.phoneno}`}>
                  <CallIcon /> Call
                </a>
                <a href={`mailto:${item.email}`}>
                  <EmailIcon /> Email
                </a>
              </div>

              <h1>{item.title}</h1>
              <div className="details-container">
                <p>Founder: </p>
                <p>{item.name}</p>
              </div>

              <div className="details-container desc">
                <p>Desc: {item.description}</p>
              </div>
              <div className="details-container desc">
              <p>
                T/C* If the item owner is not found within 2 months, the item will be out for bidding.
              </p></div>

              <p>Contact No of Center: 9876543234</p>
              
            </div>
          )
        )}
      </section>
    </main>
  );
}

export default Details;
