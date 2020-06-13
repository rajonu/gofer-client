import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import Loader from "../../Loader";
import { ToastContainer, toast } from "react-toastify";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "../../class/storage";
import { Navbar } from "../Navbar";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

export const AddCompany = () => {
  const history = createBrowserHistory();
  const [loader, setLoader] = useState(false);

  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    phone: "",
    company_id: "",
    nid: "",
    referal: "",
    drivingLicense: "",
    payment_type: "",
    bikeRegNumber: "",
    area: "",
  });

  const [error, setError] = useState({});
  const {
    name,
    username,
    password,
    address,
    phone,
    company_id,
    nid,
    referal,
    drivingLicense,
    bikeRegNumber,
    payment_type,
    area,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    if (isAuth()) {
      if (!isAuth().role === "admin") {
        //setValues({ ...values, company_id: isAuth().company_id });
      }
    }
  }, []);

  const sendRequest = async (e) => {
    e.preventDefault();

    setLoader(true);
    //console.log(company_id);

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/adddeliveryman`,
        data: {
          name,
          username,
          password,
          address,
          phone,
          company_id: isAuth().company_id,
          nid,
          referal,
          drivingLicense,
          bikeRegNumber,
          payment_type,
          area,
        },
      });
      if (result) {
        //console.log(result)
        setLoader(false);
        toast.success(result.data.message);
        setError({});
        setValues({
          name: "",
          username: "",
          address: "",
          phone: "",
          password: "",
          referal: "",
          drivingLicense: "",
          bikeRegNumber: "",
          nid: "",
          payment_type: "",
          area: "",
        });
      }
    } catch (e) {
      //console.log(e.response.data.error);
      setLoader(false);
      toast.error(e.response.data.error);
      //console.log(e);

      setError(e.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <main className='default-transition'>
        <div className='row h-100'>
          <div className='col-12 col-md-10 mx-auto my-auto'>
            <div className='card auth-card'>
              <div className='form-side'>
                <h1 className='mb-4'>Add a Delivery Man</h1>

                <div className=''></div>
                <form>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.name
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("name")}
                      value={name}
                    />
                    <div className='invalid-feedback'>{error.name}</div>
                    <span>Delivery Man Name</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.nid ? " form-control is-invalid" : " form-control"
                      }
                      type='text'
                      onChange={handleChange("nid")}
                      value={nid}
                    />
                    <div className='invalid-feedback'>{error.nid}</div>
                    <span>National ID Card Number</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.username
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("username")}
                      value={username}
                    />
                    <div className='invalid-feedback'>{error.username}</div>
                    <span>Enter Username(Ex. Phone number/Email)</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.password
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='password'
                      placeholder=''
                      onChange={handleChange("password")}
                      value={password}
                    />
                    <div className=' invalid-feedback'>{error.password}</div>
                    <span>Password</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.payment_type
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("payment_type")}
                      value={payment_type}></textarea>
                    <div className=' invalid-feedback'>
                      {error.payment_type}
                    </div>
                    <span>Payment Details</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.address
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("address")}
                      value={address}></textarea>
                    <div className=' invalid-feedback'>{error.address}</div>
                    <span>Delivery Man Address</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.phone
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='number'
                      onChange={handleChange("phone")}
                      value={phone}
                    />{" "}
                    <div className=' invalid-feedback'>{error.phone}</div>
                    <span>Delivery Man Phone Number</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.area
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("area")}
                      value={area}
                    />{" "}
                    <div className=' invalid-feedback'>{error.area}</div>
                    <span>Delivery Man Area</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.referal
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("referal")}
                      value={referal}
                    />{" "}
                    <div className=' invalid-feedback'>{error.referal}</div>
                    <span>Delivery Man Referal</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.drivingLicense
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("drivingLicense")}
                      value={drivingLicense}
                    />{" "}
                    <div className=' invalid-feedback'>
                      {error.drivingLicense}
                    </div>
                    <span>Driving License</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.bikeRegNumber
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("bikeRegNumber")}
                      value={bikeRegNumber}
                    />{" "}
                    <div className=' invalid-feedback'>
                      {error.bikeRegNumber}
                    </div>
                    <span>Bike Reg Number</span>
                  </label>

                  <div className='d-flex justify-content-end align-items-center'>
                    <button
                      className='btn btn-primary btn-lg btn-shadow'
                      type='submit'
                      onClick={sendRequest}>
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
      {loader && <Loader />}
      {isAuth() && <Layout />}
    </>
  );
};

export default AddCompany;
