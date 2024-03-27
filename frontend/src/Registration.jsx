import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCPassword, setErrorCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();
    // Frontend validation
    if (username.length <= 5) {
      setErrorUsername("Username must be more than 5 characters.");
      return;
    }
    if (password.length <= 6) {
      setErrorPassword("Password must be more than 6 characters.");
      return;
    }
    if (password !== cpassword) {
      setErrorCPassword("Passwords do not match.");
      return;
    }
    if (phone.length !== 11) {
      setErrorPhone("Phone number must have exactly 11 digits.");
      return;
    }
    // Backend API call
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username,
        password,
        email,
        phone,
        cpassword
      });
      console.log(response.data);
      setErrorMessage("");
      if(response.status === 200){
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error registering user.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <div className="flex flex-col items-center gap-y-2">
        <p className="text-3xl font-black text-xgray lg:text-4xl">
          Login to your account
        </p>
      </div>
      <div className="flex w-[360px] flex-col gap-y-8 lg:w-[400px]">
        <div className="flex flex-col gap-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-xblue"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-sm text-xred">{errorUsername}</p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-xblue"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-xred">{errorEmail}</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-xblue"
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-sm text-xred">{errorPhone}</p>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-xblue"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm text-xred">{errorPassword}</p>
          </div>

          <div className="flex flex-col gap-y-2">
            <div>
              <input
                type="password"
                placeholder="CPassword"
                className="w-full rounded-md border border-[#DED2D9] px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-xblue"
                onChange={(e) => setCPassword(e.target.value)}
              />
              <p className="text-sm text-xred">{errorCPassword}</p>
            </div>

            <div className="flex justify-end">
              <button className="text-sm font-medium text-xblue">
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={login}
            className="w-full rounded-md bg-xblue p-3 text-lg font-medium text-white hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
