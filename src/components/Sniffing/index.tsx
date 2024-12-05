"use client";

import Image from "next/image";
import React from "react";

type SectionProps = {
  title: string;
  content: string | JSX.Element;
};

type PlaceholderProps = {
  type: "image" | "video";
};

const Section: React.FC<SectionProps> = ({ title, content }) => (
  <div className="mb-8 self-start">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed">{content}</div>
  </div>
);

const Placeholder: React.FC<PlaceholderProps> = ({ type }) => (
  <div
    className={`my-6 ${
      type === "image" ? "h-48 bg-gray-300" : "h-64 bg-gray-200"
    } flex items-center justify-center rounded-md`}
  >
    <span className="text-gray-500">
      {type === "image" ? "Image Placeholder" : "Video Placeholder"}
    </span>
  </div>
);

export default function Blog(): JSX.Element {
  return (
    <div className="mx-auto max-w-4xl p-6 flex-col flex items-center gap-4 py-10">
      {/* Blog Title */}
      <h1 className="self-start text-4xl font-extrabold text-gray-900 mb-6">Sniffing</h1>

      {/* Main Definition */}
      <Section
        title="What is Sniffing?"
        content={
          <p>
            Sniffing is the act of monitoring and capturing data packets
            traveling through a network. It is often used legitimately for
            network troubleshooting, monitoring, and analysis.
            <br />
            <br />
            Sniffing attacks occur when a malicious actor uses sniffing tools to
            intercept and capture sensitive information, such as passwords,
            credit card numbers, or private messages, without authorization.
            These attacks exploit unsecured networks or weak encryption to steal
            data.
            <br />
            <br />
            Packets are small units of data transmitted over a network. Each
            packet contains a portion of the overall data being sent, along with
            metadata like source and destination addresses, protocols, and
            error-checking information.
          </p>
        }
      />
      <Image
        src={"/images/Sniffing/Sniffing.png"}
        width={200}
        height={500}
        alt="image"
        className="h-1/2 w-1/2"
      />

      {/* Types of Sniffing */}
      <Section
        title="Types of Sniffing"
        content={
          <ul className="list-disc ml-6">
            <li>
              <strong>Active:</strong> This method is used on switched networks,
              where only the packet’s destination can receive the data. Hackers
              need to get around this and do so by adding traffic to the
              network.
            </li>
            <li>
              <strong>Passive:</strong> When several devices are connected to
              your Local Area Network (LAN) or wireless network, a hacker could
              connect too and passively monitor traffic going through this hub.
              This type of packet sniffing can be very difficult to detect —
              think of it like covert spying or wiretapping.
            </li>
          </ul>
        }
      />

      {/* Sniffing Attack Methods */}
      <Section
        title="Sniffing Attack Methods"
        content={
          <ul className="list-disc ml-6">
            <li>
              <strong>Password Sniffing:</strong> Collecting data packets
              containing passwords and other login information.
            </li>
            <li>
              <strong>Wi-Fi Packet Sniffing:</strong> Hackers deploying sniffers
              on unsecured networks like public Wi-Fi.
            </li>
            <li>
              <strong>Browser History Sniffing:</strong> Capturing saved data or
              login information from browsers.
            </li>
            <li>
              <strong>JavaScript Sniffers:</strong> Using malicious JavaScript
              code to intercept private information.
            </li>
          </ul>
        }
      />
      <iframe
        className="h-[400px] w-full"
        src={`https://www.youtube.com/embed/ejkYXc1wxRg?si=xP0is-pZV0fpyraNs`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {/* Examples of Sniffing Attacks */}
      <Section
        title="Examples of Sniffing Attacks"
        content={
          <ul className="list-disc ml-6">
            <li>
              <strong>Heartland Payment Systems Data Breach (2009):</strong>{" "}
              Malware allowed sensitive financial information to be sniffed as
              it crossed the network, costing $12.6 million.
            </li>
            <li>
              <strong>APT28 Attack on Hotel Guests (2017):</strong> A Russian
              hacking group used Wi-Fi sniffing to steal data from hotel guests
              in Europe and the Middle East.
            </li>
          </ul>
        }
      />

      {/* Dangers/Threats of Sniffing */}
      <Section
        title="Dangers/Threats of Sniffing"
        content={
          <ul className="list-disc ml-6">
            <li>
              Data theft: Capturing sensitive information such as usernames,
              passwords, and personal data.
            </li>
            <li>
              Unauthorized Access: Allowing attackers to gain access to systems
              or applications.
            </li>
            <li>
              Privacy Violation: Exposing private communications or browsing
              history.
            </li>
            <li>
              Loss of Business Confidentiality: Exposing corporate data and
              intellectual property.
            </li>
            <li>
              Identity Theft: Using stolen personal information for fraud or
              impersonation.
            </li>
          </ul>
        }
      />

      {/* Defense Against Sniffing Attacks */}
      <Section
        title="Defense Against Sniffing Attacks"
        content={
          <ul className="list-disc ml-6">
            <li>Keep software updated to patch vulnerabilities.</li>
            <li>Use strong passwords and enable two-factor authentication.</li>
            <li>Be cautious when opening emails from unknown sources.</li>
            <li>Connect to the internet with a VPN for encrypted browsing.</li>
            <li>Only visit secure websites using the HTTPS protocol.</li>
          </ul>
        }
      />

      {/* Facts and Figures */}
      <Section
        title="Facts and Figures"
        content={
          <ul className="list-disc ml-6">
            <li>
              Nearly 65% of consumers use unsecured public Wi-Fi, increasing
              sniffing risks.
            </li>
            <li>
              Data breaches cost organizations an average of $4.35 million per
              incident globally.
            </li>
            <li>
              Legacy encryption standards like WEP remain highly vulnerable to
              sniffing attacks.
            </li>
          </ul>
        }
      />
<footer className="mt-8 text-gray-600 text-center">
        <p>
          Sources:
         <a
                href="https://www.avast.com/c-packet-sniffing"
            className="text-blue-500 underline"
          >
            Avast
          </a>
          ,
          <a
                href="https://us.norton.com/blog/emerging-threats/packet-sniffing-attack"
            className="text-blue-500 underline"
          >
            Norton
          </a>
          <a
                href="https://www.cisco.com/c/en/us/products/security/email-security/what-is-phishing.html#~phishing-attacks"
            className="text-blue-500 underline"
          >
            Cisco
          </a>
        </p>
      </footer>
      
    </div>
  );
}
