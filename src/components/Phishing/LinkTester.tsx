'use client';
 
import { useTranslations } from 'next-intl';
import { useState } from 'react';
 
export default function PhishingDetectionPage(): JSX.Element {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null); // Store the entire response data
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('phishing.link-tester')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }
 
    setLoading(true);
    setResult(null);
    setError(null);
 
    try {
      const response = await fetch('/api/ai-detector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to analyze the URL.');
        setLoading(false);
        return;
      }
 
      const data = await response.json();
      console.log("API Response Data:", data);
 
      // Extract the data from the API response
      const languageTag = data.tags.find((tag: string) => tag.startsWith("Language"))?.split(" - ")[1] || 'Unknown';
      const riskTag = data.tags.find((tag: string) => tag.startsWith("Phishing"))?.split(" - ")[1] || 'Unknown';; // Since phishing risk is not provided, setting it to 'Unknown'
 
      setResult({
        url: decodeURIComponent(data.url), // Decode the URL
        title: data.title || 'Unknown',
        description: data.description || 'Unknown',
        language: languageTag,
        risk: riskTag,
      });
 
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md md:w-2/3 w-full">
        <p className="text-gray-600 text-center mb-6">
          {t('description')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
          {t('label')}
          </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Check URL'}
          </button>
        </form>
 
        {/* Displaying the results */}
        {result && (
          <div className="mt-4">
            <p className="text-center text-lg font-medium text-gray-800">
              <strong>URL:</strong> {result.url}
            </p>
            <p className="text-center text-lg font-medium text-gray-800">
              <strong>Title:</strong> {result.title}
            </p>
            <p className="text-center text-lg font-medium text-gray-600">
              {/*<strong>Description:</strong> {result.description}*/}
            </p>
            <p className="text-center text-lg font-medium text-gray-600">
              <strong>Language:</strong> {result.language}
            </p>
            <p className="text-center text-lg font-medium text-red-600">
              <strong>Phishing Risk:</strong> {result.risk}
            </p>
          </div>
        )}
 
        {/* Display error message */}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
  );
}
