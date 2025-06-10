import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Icons } from "./Icons";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const { verifyOTP, forgotPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;

  // Redirect if no email is provided
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      e.target.previousSibling?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      return;
    }

    try {
      await verifyOTP(email, otpValue);
      navigate("/reset-password", { state: { email, otp: otpValue } });
    } catch (error) {
      // Error handled in context
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      await forgotPassword(email);
    } catch (error) {
      // Error handled in context
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-black rounded-lg flex items-center justify-center mb-4">
              <Icons.Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Verify OTP</h2>
            <p className="text-gray-600 mb-2">We've sent a 6-digit code to</p>
            <p className="font-medium text-black">{email}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-4">
                Enter OTP Code
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Icons.Spinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors duration-200"
              >
                <Icons.ArrowLeft className="mr-1 h-4 w-4" />
                Back to forgot password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
