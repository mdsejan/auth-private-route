import { sendEmailVerification } from "firebase/auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const [registerError, setRegisterErro] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    // reset error
    setRegisterErro("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterErro("password should be at least 6 charachters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterErro(
        "your password should have at least one upper case charecters"
      );
      return;
    } else if (!accepted) {
      setRegisterErro("please accept our T&C");
    }

    // create user
    createUser(email, password)
      .then((result) => {
        // send verication email
        sendEmailVerification(result.user).then(() => {
          setSuccess(
            "successfully registered. Please check your email and verify your account"
          );
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterErro(error.message);
      });
  };
  return (
    <div className="max-w-screen-2xl mx-auto flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-4xl font-bold mb-9 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            />
            <h2
              className="px-3 cursor-pointer bg-slate-900 w-16 mt-4 text-white ml-auto"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "hide" : "Show"}
            </h2>
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2 my-4" htmlFor="terms">
              Accept Our terms And Conditions
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            Register
          </button>
        </form>
        {registerError && <p className="text-red-700 mt-5">{registerError}</p>}
        {success && <p className="text-green-700 mt-5">{success}</p>}
        <p className="mt-8 text-md">
          Alredy have an Account?
          <Link to="/login" className="text-red-950 font-bold ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
