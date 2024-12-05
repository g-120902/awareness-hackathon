"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function Chatbot(): JSX.Element {
  // State to control iframe visibility
  const [isIframeVisible, setIframeVisible] = useState(false);

  // Ref to detect clicks outside the iframe
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Toggle iframe visibility
  const toggleIframe = () => {
    setIframeVisible(!isIframeVisible);
  };

  // Hide iframe when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the iframe and button
      if (
        iframeRef.current &&
        !iframeRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIframeVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="select-none flex w-3/12 h-1/2 sticky z-30 bottom-0 my-6 flex-col justify-end items-start py-14">
      <div className="flex flex-col py-2 justify-center items-center">
        <button
          ref={buttonRef}
          onClick={toggleIframe}
          className="z-50 p-2" // Added padding to the button for better click area
          style={{
            background: "transparent", // Remove background to just show the image
            border: "none", // Remove button border
          }}
        >
          {/* Replace the text with an image (e.g., an icon for the button) */}
          <Image
            priority
            src="/images/chatbot/icon.png"
            alt="Chatbot Toggle"
            width={100}
            height={100}
          />
        </button>
        <span className="bg-white px-2">
          <p className="text-blue-hover">Chatbot</p>
        </span>
      </div>

      {/* Iframe that shows/hides based on isIframeVisible state */}
      {isIframeVisible && (
        <iframe
          ref={iframeRef}
          className="absolute z-50 w-full h-96"
          src="https://www.chatbase.co/chatbot-iframe/O079ElDh4drRcnEMf3y6T"
          width="100%"
          title="Chatbot"
        ></iframe>
      )}
    </div>
  );
}
