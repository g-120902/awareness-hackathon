"use client";

import LinkTester from "@/components/Phishing/LinkTester";
import Image from "next/image";
import React from "react";

export default function PhishingBlog(): JSX.Element {
  return (
    <div className="flex flex-col gap-6 px-6 py-10 max-w-4xl mx-auto items-center">
      <h1 className="text-4xl font-bold self-start">Phishing</h1>

      <Image
        src={"/images/Phishing/Phishing2.jpg"}
        width={200}
        height={500}
        alt="image"
        className="h-1/2 w-1/2"
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">What is Phishing?</h2>
        <p className="text-lg leading-7">
          Phishing is the act of sending fraudulent communications, such as
          emails, text messages, or social media messages, impersonating trusted
          entities to deceive victims into revealing sensitive information.
          These scams often appear to come from reputable sources like banks,
          delivery companies, or social connections.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Examples of Phishing Attacks
        </h2>
        <ul className="list-disc pl-5 text-lg leading-7">
          <li>
            <strong>Email Account Compromise:</strong> An employee’s email is
            hacked and used to request payments from vendors. The money is then
            sent to attackers’ accounts.
          </li>
          <li>
            <strong>Employee Impersonation:</strong> Attackers impersonate
            trusted internal employees or vendors to steal money or sensitive
            information.
          </li>
          <li>
            <strong>Internal Payment Fraud:</strong> Stolen credentials grant
            access to payment systems, allowing attackers to redirect funds.
          </li>
          <li>
            <strong>Social Engineering:</strong> Gaining trust to manipulate
            individuals into sharing personal information.
          </li>
          <li>
            <strong>Extortion:</strong> Using threats or intimidation to extract
            personal information or money.
          </li>
        </ul>
        <iframe
          className="h-[400px] w-full"
          src={`https://www.youtube.com/embed/3GBmpqhQI8s`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          How Do Phishing Scams Trick Users?
        </h2>
        <p className="text-lg leading-7">
          Attackers rely on social engineering and create fake communications
          that look legitimate, tricking users into downloading malware,
          visiting infected sites, or divulging login credentials to steal data.
        </p>
        <p className="text-lg leading-7">
          A single successful phishing attack can compromise an entire network,
          making awareness essential.
        </p>
      </section>

      <section className="self-start">
        <h2 className="text-2xl font-semibold mb-4">Dangers of Phishing</h2>
        <h3 className="text-xl font-medium mb-2">Personal Risks:</h3>
        <ul className="list-disc pl-5 text-lg leading-7">
          <li>Money stolen from bank accounts</li>
          <li>Fraudulent charges on credit cards</li>
          <li>Lost access to photos, videos, and files</li>
          <li>Fake posts on social media accounts</li>
          <li>Attackers impersonating you to exploit others</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2">Workplace Risks:</h3>
        <ul className="list-disc pl-5 text-lg leading-7">
          <li>Loss of corporate funds</li>
          <li>Exposure of personal or customer information</li>
          <li>Locked and inaccessible files</li>
          <li>Damage to organizational reputation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          How to Increase Phishing Awareness
        </h2>
        <ul className="list-disc pl-5 text-lg leading-7">
          <li>
            Use security solutions like email filters and robust firewalls.
          </li>
          <li>Conduct regular phishing simulations and awareness training.</li>
          <li>Avoid posting contact information online.</li>
          <li>
            Use complex passwords (at least 12 characters with a mix of
            uppercase, lowercase, and special characters) and store them in
            password managers.
          </li>
        </ul>
      </section>

      <section className="self-start">
        <h2 className="text-2xl font-semibold mb-4">Phishing Safety Steps</h2>
        <ul className="list-disc pl-5 text-lg leading-7">
          <li>Examine hypertext links and email addresses carefully.</li>
          <li>Do not click on links from unknown sources.</li>
          <li>Keep browsers and software updated.</li>
          <li>Monitor online accounts regularly for unusual activity.</li>
          <li>Never give out personal information over email.</li>
          <li>
            Be cautious of pop-up windows and messages from unknown senders.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Phishing Facts</h2>
        <ul className="list-disc pl-5 text-lg leading-7">
          <li>
            <strong>Most Common Cyber Threat:</strong> Phishing is the most
            common way cybercriminals steal personal and financial information.
          </li>
          <li>
            <strong>Fake Websites:</strong> Millions of fake websites are
            created every year to trick people.
          </li>
          <li>
            <strong>Targets Everyone:</strong> Individuals and businesses, big
            or small, are at risk.
          </li>
          <li>
            <strong>High Costs:</strong> Phishing scams cost companies millions
            in lost funds and data breaches.
          </li>
          <li>
            <strong>Most Impersonated Brands:</strong> Banks, tech companies,
            and delivery services.
          </li>
        </ul>
      </section>

      <footer className="mt-8 text-gray-600 text-center">
        <p>
          Sources:
          <a
            href="https://us.norton.com/blog/emerging-threats/what-is-phishing"
            className="text-blue-500 underline"
          >
            Norton
          </a>
          ,
          <a
            href="https://www.cisco.com/c/en/us/products/security/email-security/what-is-phishing.html#~phishing-attacks"
            className="text-blue-500 underline"
          >
            Cisco
          </a>
        </p>
      </footer>
      <LinkTester />
    </div>
  );
}
