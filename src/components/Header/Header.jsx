// import { NavLink } from "react-router-dom";

// Components
import Button from "../Button/Button";

// CSS
import "./Header.css";

// Icons
import { PiExamFill } from "react-icons/pi";
import { LiaFirstOrder, LiaHomeSolid } from "react-icons/lia";
import { FaShopware } from "react-icons/fa";
import { SiBlueprint } from "react-icons/si";
import { GiSurroundedEye } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>
          <PiExamFill />
          UAS SO 4
        </h1>
      </div>
      <div className="navbar">
        <NavLink to={"/"}>
          <LiaHomeSolid size={24} /> HOME
        </NavLink>
        <NavLink to={"/fcfs"}>
          <LiaFirstOrder size={24} /> FCFS
        </NavLink>
        <NavLink to={"/sjfs"}>
          <FaShopware size={24} /> SJFS
        </NavLink>
        <NavLink to={"/ps"}>
          <SiBlueprint size={24} /> PS
        </NavLink>
        <NavLink to={"/rrs"}>
          <GiSurroundedEye size={24} /> RRS
        </NavLink>
      </div>
      <div className="btn-wrapper">
        <Button>LOGIN</Button>
      </div>
    </header>
  );
};

export default Header;
