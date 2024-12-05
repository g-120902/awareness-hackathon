'use client';
 
import Image from 'next/image';
import { useState } from 'react';
 
/**
 * Deepfake Testing Interface
 *
 * A simple UI for users to upload a file (image/video) and test for deepfake.
 *
 * @author
 * @since 2024-11-27
 *
 * @returns {JSX.Element} Deepfake Testing Page
 */
export default function DeepfakeTesting(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      setError(null);
 
      // Generate a preview for image files
      if (selectedFile.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null); // No preview for non-image files
      }
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!file) {
      setError('Please upload a file.');
      return;
    }
 
    setLoading(true);
    setError(null);
 
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const base64String = fileReader.result?.toString().split(',')[1]; // Extract base64 string
        if (!base64String) {
          setError('Failed to process the file.');
          setLoading(false);
          return;
        }
 
        const response = await fetch('/api/deep-fake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            docBase64: base64String,
            reqId: 'deepfake-test', // Example reqId
            docType: file.type.startsWith('image') ? 'image' : 'video',
          }),
        });
 
        if (!response.ok) {
          setError('Failed to process the file. Please try again.');
          setLoading(false);
          return;
        }
 
        const data = await response.json();
        setResult(`Detection Result: ${data.result}`);
      };
 
      fileReader.readAsDataURL(file);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Deepfake Detection
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Upload an image file to check for deepfakes.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none"
            />
          </div>
          <div className="w-full h-48 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
            {preview ? (
              <Image src={preview} alt="Preview" className="h-full w-full object-contain" />
            ) : (
              <Image src="/images/BlankImg/blank.jpg" alt="Preview" className="h-full w-full object-contain" width={100} height={100}/>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Test for Deepfake'}
          </button>
        </form>
        {result && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {result}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
 