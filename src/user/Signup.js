import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in sign up"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
   return(
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
   <div className="alert alert-success"
      style={{ display: success ? "" : "none" }}s>
      New account was successfully created. Please 
      <Link to="/signin"> Login Here</Link>
    </div>
    </div>
    </div>
    ) 
  };

  const errorMessage = () => {
   return( 
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
   <div
       className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
    </div>
    </div>
    )
  };

  return (
    <Base title="Sign Up Page" description="A page for user to sign up">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
     
    </Base>
  );
};

export default Signup;
