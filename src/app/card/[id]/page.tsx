"use client";
import React, { useState } from "react";

export default function GiftCardPage() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-72 h-96 perspective">
        <div
          className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isOpen ? "rotate-y-0" : "rotate-y-90"
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full bg-white rounded-lg shadow-lg backface-hidden">
            <div className="p-5">
              <p>
                Congratulations <strong>Tanya!</strong>
              </p>
              <img
                src="https://via.placeholder.com/150"
                alt="Card image"
                className="w-full h-40 object-cover rounded-lg my-3"
              />
              <p>
                from <strong>Sohail</strong> & culture café
              </p>
            </div>
          </div>
          {/* Inside of the Card */}
          <div className="absolute w-full h-full bg-white rounded-lg shadow-lg backface-hidden transform rotate-y-180">
            <div className="p-5">
              <p>
                Congratulations <strong>Tanya!</strong>
              </p>
              <p className="my-3">
                This is my personal message bla bla enjoy the coffees!!
              </p>
              <p>
                from <strong>Sohail</strong> & culture café
              </p>
            </div>
          </div>
        </div>
        {/* Back Cover of the Card */}
        <div
          className={`absolute w-full h-full bg-white rounded-lg shadow-lg backface-hidden transform ${
            isOpen ? "rotate-y-180" : "rotate-y-90"
          }`}
        ></div>
      </div>
      <button
        onClick={handleOpen}
        className="mt-5 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        {isOpen ? "Close card" : "Open card"}
      </button>
    </div>
  );
}
