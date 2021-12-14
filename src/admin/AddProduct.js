import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategory, creataProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    success:false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
    success
  } = values;

  useEffect(() => {
    preLoad();
  }, []);

  const preLoad = () => {
    getAllCategory().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value=name =="photo"? e.target.files[0]:e.target.value
    formData.set(name,value);
    setValues({ ...values,[name]:value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({...values,error:"",loading:true});
    creataProduct(user._id,token,formData)
    .then(data=>{
      if(data.error){
        setValues({...values,error:data.error, success:false,});
      }else{
        setValues({...values,
        name:"",
        description:"",
        price:"",
        photo:"",
        stock:"",
        success:true,
        loading:false,
        createdProduct:data.name,
      })
      }
    }).catch(err=>console.log(err))
  };

  const successMessage = () => {
    return(
     
    <div className="alert alert-success mt-3"
       style={{ display: success ? "" : "none" }}s>
         Product Successfully Created
      
     </div>
     ) 
   };
 
   const errorMessage = () => {
    return( 
    
    <div
        className="alert alert-danger"
       style={{ display: error ? "" : "none" }}
     >
       {error}
     </div>
     )
   };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          
          {categories && categories.map((category,index)=>(
            <option  key={index} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add product here"
      description="Product creation section"
      className="container bg-info p-4"
    >
      <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">

        <div className=" col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
