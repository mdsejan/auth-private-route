import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const { signInUser, googleSignIn, githubSignIn, facebookSignIn } =
    useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    setSuccess("");
    setError("");

    signInUser(email, pass)
      .then(() => {
        setSuccess("Successfully Logged In");
        e.target.reset();
        navigate("/orders");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleForgotPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      setError("please provide an Email");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setError("Please write a valied Email");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(
          " Password reset email sent! check your email to reset password"
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        setSuccess("Successfully Logged In");
        navigate("/orders");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGithubLogin = () => {
    githubSignIn()
      .then(() => {
        setSuccess("Successfully Logged In");
        navigate("/orders");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleFacebookLogin = () => {
    facebookSignIn()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
              ref={emailRef}
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
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            />
            <a
              onClick={handleForgotPass}
              className="mt-3 cursor-pointer inline-block"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            Login
          </button>
        </form>
        {success && <p className="text-green-700 font-bold mt-5">{success}</p>}
        {error && <p className="text-red-700 font-bold mt-5">{error}</p>}
        {!error && !success && (
          <p className="mt-8 text-md">
            New to this website? Please
            <Link to="/register" className="text-red-950 font-bold">
              Register
            </Link>
          </p>
        )}

        <div className="divider mt-8">Or Continue With </div>

        <div className="flex justify-around mt-8">
          <figure onClick={handleGoogleLogin} className="cursor-pointer">
            <img
              className="w-10"
              src="https://i.ibb.co/HpLpWjn/google.png"
              alt="google"
            />
          </figure>
          <figure onClick={handleGithubLogin} className="cursor-pointer">
            <img
              className="w-10"
              src="https://i.ibb.co/1ZvsBxg/github.png"
              alt="google"
            />
          </figure>
          <figure onClick={handleFacebookLogin} className="cursor-pointer">
            <img
              className="w-10"
              src="https://i.ibb.co/4pG8jY5/facebook.png"
              alt="google"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Login;
