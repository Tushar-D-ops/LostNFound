import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { gsap } from "gsap";

export default function Post({token,setToken}) {
  useEffect(() => {
    gsap.from(".lfh1", { duration: 1, y: 100, opacity: 0, ease: "power2.out" });
    gsap.from("#pfi1", { duration: 1, y: 100, opacity: 0, ease: "power2.out" });
    gsap.from(".input-container", {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [btn, setBtn] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const api=process.env.REACT_APP_API;


  const submitData = async (e) => {
    e.preventDefault();
    setBtn(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneno", phone);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("description", desc);
    if (file) {
      formData.append("file", file);
    }
    console.log(formData)

    try {
      const response = await fetch(`${api}/api/item/post`, {
        method: "POST",
        headers:{token},
        body: formData,
      });

      if (response.ok) {
        enqueueSnackbar("Item Posted Successfully", { variant: "success" });
        navigate("/find");
      } else {
        throw new Error("Failed to post item");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error", { variant: "error" });
      setBtn(true);
    }
  };

  return (
    <main id="postItem">
      <Navbar setToken={setToken}/>
      <section>
        <h1 className="lfh1">Post Found Item</h1>
        <div className="pink-gradient"></div>
        <div className="blue-gradient"></div>
        <div className="white-gradient"></div>
        <div className="form-container">
          <h2 id="pfi1">Please fill all the required fields</h2>
          <form className="form" onSubmit={submitData}>
            <div className="input-container">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Description</label>
              <input value={desc} onChange={(e) => setDesc(e.target.value)} required />
            </div>
            <div className="input-container">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="input-container">
              <button type="submit" className="submitbtn" disabled={!btn}>
                {btn ? "Post" : "Posting..."}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
