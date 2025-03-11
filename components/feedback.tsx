"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !feedback.trim()) {
      alert("Please provide both a rating and feedback");
      return;
    }

    setIsSubmitting(true);

    const data = {
      rating: rating.toString(),
      feedback: feedback.trim(),
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: window.navigator.userAgent,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
    };

    try {
      const response = await fetch("https://sheetdb.io/api/v1/8dk57qi0kwbac", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [data] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("SheetDB API Error:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setRating(0);
        setFeedback("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.8, borderRadius: "50%" }}
            animate={{ scale: 1, borderRadius: "50%" }}
            exit={{ scale: 0.8, borderRadius: "50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-white hover:bg-gray-50 text-primaryColor w-16 h-16 rounded-full p-0 flex items-center justify-center shadow-lg border border-gray-200 transition-all duration-300"
            >
              <Image src="/chat.svg" alt="feedback" width={30} height={30} />
            </Button>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 w-[320px] border border-gray-200 transition-all duration-300">
            {!isSubmitted ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Give Feedback</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How would you rate your experience?
                    </label>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                            className="focus:outline-none"
                            aria-label={`Rate ${ratingValue} stars`}
                            aria-pressed={rating === ratingValue}
                          >
                            <FaStar
                              className="transition-colors duration-200"
                              size={30}
                              color={
                                ratingValue <= (hover || rating)
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <textarea
                    className="w-full p-2 border rounded-md mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor"
                    rows={4}
                    placeholder="Tell us your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primaryColor hover:bg-primaryColor/90 text-white transition-all duration-300"
                    disabled={isSubmitting || !rating || !feedback}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                  {[...Array(rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400" size={30} />
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-600">We appreciate your feedback.</p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feedback;
