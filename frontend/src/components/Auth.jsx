import React, { useState } from "react";
import axios from "axios";

const Auth = ({ setToken }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Id_Proof: "",
    defaultLocation: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let newUrl = "http://localhost:4000/api/user";
    if (currentState === "Login") {
      newUrl += "/login";
    } else {
      newUrl += "/register";
    }

    try {
      const response = await axios.post(newUrl, formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during authentication", error);
      alert("Something went wrong. Check the console.");
    }
  };

  return (
    <div className=" select-none flex-grow flex items-center justify-center px-4 sm:px-8 py-10 font-inter w-full">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 bg-surface-container-lowest p-8 sm:p-10 rounded-[2rem] shadow-sm border border-outline-variant/30 w-full max-w-md transition-all"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">
            {currentState}
          </h2>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {currentState === "Sign Up"
            ? "Create an account to join the hub."
            : "Welcome back! Please enter your details."}
        </p>

        {currentState === "Sign Up" && (
          <>
            <input
              name="name"
              onChange={onChangeHandler}
              value={formData.name}
              type="text"
              placeholder="Your Name"
              required
              className="w-full bg-surface-container hover:bg-surface-variant transition-colors text-on-surface placeholder-gray-500 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 border border-transparent focus:border-secondary"
            />
            <input
              name="Id_Proof"
              onChange={onChangeHandler}
              value={formData.Id_Proof}
              type="text"
              placeholder="ID Proof (e.g., aadhar card ID)"
              required
              className="w-full bg-surface-container hover:bg-surface-variant transition-colors text-on-surface placeholder-gray-500 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 border border-transparent focus:border-secondary"
            />

            <input
              name="defaultLocation"
              onChange={onChangeHandler}
              value={formData.defaultLocation}
              type="text"
              placeholder="Your City or Neighborhood (Optional)"
              className="w-full bg-surface-container hover:bg-surface-variant transition-colors text-on-surface placeholder-gray-500 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 border border-transparent focus:border-secondary"
            />
          </>
        )}

        <input
          name="email"
          onChange={onChangeHandler}
          value={formData.email}
          type="email"
          placeholder="Email Address"
          required
          className="w-full bg-surface-container hover:bg-surface-variant transition-colors text-on-surface placeholder-gray-500 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 border border-transparent focus:border-secondary"
        />

        <input
          name="password"
          onChange={onChangeHandler}
          value={formData.password}
          type="password"
          placeholder="Password"
          required
          className="w-full bg-surface-container hover:bg-surface-variant transition-colors text-on-surface placeholder-gray-500 p-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 border border-transparent focus:border-secondary"
        />

        <button
          type="submit"
          className="mt-4 bg-secondary hover:bg-secondary/90 text-white font-semibold p-4 rounded-xl transition-all shadow-sm"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="text-sm mt-4 text-center text-gray-500">
          {currentState === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-secondary font-semibold cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-secondary font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
