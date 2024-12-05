import React, { useState } from 'react';
import axios from 'axios';

const LinkTester: React.FC = () => {
  const [link, setLink] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkLinkSafety = async () => {
    if (!link) {
      setResult("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const apiKey = process.env.GOOGLE_SAFE;

      const response = await axios.post(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}/1.1`,
        {
          client: {
            clientId: "your-application-name",
            clientVersion: "1.0",
          },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: link }],
          },
        }
      );

      const isSafe = !response.data.matches || response.data.matches.length === 0;
      setResult(isSafe ? "The link is safe." : "The link is unsafe! Be cautious.");
    } catch (error) {
      console.error("Error checking link safety:", error);
      setResult("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Link Tester</h1>
      <input
        type="text"
        placeholder="Enter a link to test"
        className="w-full px-4 py-2 border rounded-md mb-4"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        onClick={checkLinkSafety}
        disabled={loading}
        className="w-full bg-pale-blue text-blue-hover px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Checking..." : "Test Link"}
      </button>
      {result && (
        <p
          className={`mt-4 text-lg font-semibold ${
            result.includes("safe") ? "text-green-500" : "text-red-500"
          }`}
        >
          {result}
        </p>
      )}
    </div>
  );
};

export default LinkTester;
