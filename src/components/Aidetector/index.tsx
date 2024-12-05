"use client";

import { useState } from "react";

/**
 * AI Text Detection Interface
 *
 * A simple UI for users to submit text and check for AI detection.
 *
 * @returns {JSX.Element} AI Text Detection Page
 */
export default function AITextDetectionPage(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null); // AI confidence percentage

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setResult(null);
    setError(null);
    setPercentage(null); // Reset the percentage when the text changes
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError(null);
    setPercentage(null); // Reset percentage on new submission

    try {
      const response = await fetch("/api/ai-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        setError("Failed to process the text. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const score = data.score * 100; // Convert to percentage
      setPercentage(score); // Set the percentage value

      if (score >= 70) {
        setResult("AI Content");
      } else {
        const humanConfidence = 100 - score; // Human confidence calculation
        setResult(`Human Content (${humanConfidence.toFixed(2)}% confidence)`);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          AI Text Detection
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Submit text to check for AI generation.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Text
            </label>
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
              rows={5}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter text here..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Processing..." : "Detect AI Text"}
          </button>
        </form>

        {/* Progress bar */}
        {percentage !== null && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-center text-sm mt-2">
              {percentage.toFixed(2)}% AI Confidence
            </p>
          </div>
        )}

        {/* Display result */}
        {!loading && result && percentage !== null && (
          <p
            className={`mt-4 text-center font-medium ${
              percentage >= 70 ? "text-red-600" : "text-green-600"
            }`}
          >
            {result}
          </p>
        )}

        {/* Display error */}
        {!loading && error && (
          <p className="mt-4 text-center text-orange-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
