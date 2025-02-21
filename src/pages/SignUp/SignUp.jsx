import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveUser } from "../../api/utils";
import Lottie from "lottie-react";
import signupAnimation from "../../assets/animation/signUp.json";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const image = form.image.files[0];

    if (!name || !email || !password || !image) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const photoURL = await imageUpload(image);
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await saveUser({ ...result?.user, displayName: name, photoURL });
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      setError(err?.message || "Signup failed");
      toast.error(err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      setError(err?.message || "Google Sign-up failed");
      toast.error(err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="hidden md:flex w-1/2 justify-center">
        <Lottie animationData={signupAnimation} loop={true} className="w-[80%]" />
      </div>
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Sign Up</h1>
          <p className="text-sm text-gray-500">Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" required placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:ring-lime-500 focus:border-lime-500" />
          <input type="file" name="image" accept="image/*" required className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:ring-lime-500 focus:border-lime-500" />
          <input type="email" name="email" required placeholder="Email Address" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:ring-lime-500 focus:border-lime-500" />
          <input type="password" name="password" required placeholder="Password" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:ring-lime-500 focus:border-lime-500" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition duration-200" disabled={isSubmitting}>
            {isSubmitting ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="text-sm text-gray-500 hover:text-lime-500">Forgot password?</button>
        </div>

        <div className="flex items-center mt-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">or sign up with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button onClick={handleGoogleSignIn} className="w-full flex justify-center items-center space-x-3 border py-2 mt-3 rounded-md hover:bg-gray-100 transition duration-200" disabled={isSubmitting}>
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account? {" "}
          <Link to="/login" className="text-lime-500 font-medium hover:underline">Log in</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;