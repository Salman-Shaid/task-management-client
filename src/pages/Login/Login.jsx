import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/login.json"; // Ensure the path is correct

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;
  if (loading) return <LoadingSpinner />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      setError(err?.message || "Login failed");
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      setError(err?.message || "Google Sign-in failed");
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Left Side: Lottie Animation */}
      <div className="hidden md:flex w-1/2 justify-center">
        <Lottie animationData={loginAnimation} loop={true} className="w-[80%]" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Log In</h1>
          <p className="text-sm text-gray-500">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter Your Email"
              className="w-full mt-1 px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="*******"
              className="w-full mt-1 px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition duration-200"
            disabled={loading}
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="text-sm text-gray-500 hover:text-lime-500">
            Forgot password?
          </button>
        </div>

        <div className="flex items-center mt-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">or sign in with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center space-x-3 border py-2 mt-3 rounded-md hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-lime-500 font-medium hover:underline">
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
