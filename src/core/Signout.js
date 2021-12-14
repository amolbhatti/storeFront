import React from "react";
import { useHistory } from "react-router-dom";
import { signout} from '../auth/helper/index';

const Signout = () => {
  const history = useHistory();
  return (
    <li className="nav-item">
      <span className="nav-link text-warning" onClick={() => {signout(()=>{
          history.push("/");
      }) 
      }}>
        SignOut
      </span>
    </li>
  );
};

export default Signout;
