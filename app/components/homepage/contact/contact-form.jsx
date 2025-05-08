"use client";
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="glass-card p-0.5">
      <div className="bg-dark-lighter p-8 rounded-xl">
        <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
        <p className="text-gray-400 mb-8">
          {"Have a project in mind or want to discuss opportunities? I'd love to hear from you."}
        </p>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
            <input
              className="w-full bg-dark border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-white outline-none transition-colors"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
            <input
              className="w-full bg-dark border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-white outline-none transition-colors"
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
              placeholder="example@email.com"
            />
            {error.email && <p className="mt-2 text-sm text-red-400">Please provide a valid email!</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
            <textarea
              className="w-full bg-dark border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-white outline-none transition-colors resize-none"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="6"
              value={userInput.message}
              placeholder="Hello, I would like to talk about..."
            />
          </div>
          
          {error.required && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              All fields are required!
            </div>
          )}
          
          <button
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
            onClick={handleSendMail}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message
                <TbMailForward size={20} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;