// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";



function Home() {

  // const [name, setName] = useState("");

  // const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8081")
  //     .then((res) => {
  //       // console.log(res);
  //       if (res.data.valid) {
  //         setName(res.data.name);
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
 
  return (
    <div>
      {/* <p style={{ textAlign: "center" }}>
        Hiii.. {name} Welcome to the Raj Home
      </p> */}
      
      <ImageUpload />
    </div>
  );
}

export default Home;
