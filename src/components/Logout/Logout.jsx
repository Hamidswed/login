import { ReactComponent as Background } from "../../assets/pic2.svg";
import { useState } from "react";

const Logout = ({ logOut }) => {
  const [message, setMessage] = useState("");
  fetch("https://test.zyax.se/")
    .then((response) => response.json())
    .then((data) => setMessage(data.message));
  return (
    <div>
      <Background className="absolute" />
      <p className="absolute top-10 right-[50%] mr-[-160.415px] text-white text-2xl">
        <strong>{message}</strong>
      </p>
      <button
        onClick={logOut}
        className="bg-[#3F279F] py-2 rounded-md text-white cursor-pointer hover:bg-[#e63946] duration-200 absolute w-[150px] bottom-10 right-[50%] mr-[-75px]"
      >
        Log out
      </button>
    </div>
  );
};
export default Logout;
