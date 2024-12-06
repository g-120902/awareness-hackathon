import { NextResponse } from 'next/server';
import axios from 'axios';
 
export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { url } = await req.json();
 
    // Validate the required fields
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required for phishing detection.' },
        { status: 400 }
 
      );
    }
 
    // Access environment variables
    const API_KEY = process.env.API_TOKEN2 || '';  // API key from environment variables
    const API_URL = process.env.ENDPOINT2 || ''; // URL of the phishing detection API
 
    // Validate if environment variables are missing
    if (!API_KEY || !API_URL) {
      return NextResponse.json(
        { error: 'API key or Scan URL is missing from environment variables.' },
        { status: 500 }
      );
    }
 
    // Make the API request to scan the URL
    const response = await axios.post(
      API_URL,
      {
        apikey: API_KEY,
        url, // The URL to scan
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
 
    // Return the response from the phishing detection API
    const { status, data } = response;
    return NextResponse.json(data, { status });
  } catch (error: any) {
    console.error('Error processing the request:', error.response?.data || error.message);
 
    return NextResponse.json(
      { error: 'Failed to process the request. Please try again later.' },
      { status: 500 }
    );
  }
}