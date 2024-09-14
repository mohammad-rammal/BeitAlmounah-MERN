import { useState } from "react";
import "./headerTop.css";
import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from "./HeaderTop";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import HeaderAdmin from "./HeaderAdmin";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector(state => state.auth);
  return (

    <header className="header">
      <HeaderTop toggle={toggle} setToggle={setToggle} />
      {!user?.isAdmin && <HeaderMiddle />}
      {user?.isAdmin && <HeaderAdmin />}
      <Navbar setToggle={setToggle} toggle={toggle} />
    </header>
  );
};

export default Header;
