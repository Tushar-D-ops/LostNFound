import { useState ,useEffect} from "react";
import noImage from "../assets/no-image.png"


export default function Itemcard({item}) {
  const [image, setImage] = useState(noImage);
  const api=process.env.REACT_APP_API;


  // useEffect(() => {
  //   if (item.image) {
  //     setImage(`${api}/files/${encodeURIComponent(props.image)}`);
  //   }
  // }, [props.image]);

  return (
    <a href={`/details/${item._id}`} data-aos="fade-up">
      <div className="card">
      <div className="pink-gradient"></div>
        <div className="blue-gradient"></div>
        <div className="white-gradient"></div>
        <div className="card-img">
          <img src={item.image} alt="Uploaded File" onError={() => setImage(noImage)} />
        </div>
        <div className="card-desc">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </a>
  );
  
}
