import { Link, NavLink } from "react-router-dom";
import "../App.css";

const MainHeader = () => {
  return (
    // <Header>
    //   <nav>
    //     <ul>
    //       <li>
    //         <NavLink activeClassName={Header.active} to="/pokedex">
    //           Pokedex
    //         </NavLink>
    //       </li>

    //     </ul>
    //   </nav>
    // </Header>
    <div>
      <input id="active" type={"checkbox"} />
      <label htmlFor="active" className="menu-btn"><span></span></label>
      <label htmlFor="active" className="close"></label>
      <div className="wrapper">
        <ul>
          <li><Link to="/pokedex">Home</Link></li>
          <li><Link to="/pokemon">Pokemon</Link></li>
        </ul>
      </div>
    </div>
  );
};
export default MainHeader;
