import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastGeral.css";

const ToastGeral = () => (
    <ToastContainer
        autoClose={1500}
        toastClassName="custom-toast"
        className="custom-toast-container"
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
);

export default ToastGeral;
