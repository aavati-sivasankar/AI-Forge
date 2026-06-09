import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

function PaymentSuccess() {

  const navigate =
    useNavigate();

  useEffect(() => {

    toast.success(
      "Credits added successfully!"
    );

    setTimeout(() => {

      navigate(
        "/dashboard"
      );

    }, 3000);

  }, []);

  return (

    <div
      className="
        text-center
        mt-5
      "
    >

      <h2>
        Payment Successful
      </h2>

      <p>
        Redirecting to dashboard...
      </p>

    </div>

  );

}

export default PaymentSuccess;