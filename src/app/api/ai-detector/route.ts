import { NextResponse } from 'next/server';
import axios from 'axios';
 
export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { text } = await req.json();
 
    // Validate required fields
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for AI content detection.' },
        { status: 400 }
      );
    }
 
    // Access environment variables
    const API_KEY = process.env.API_TOKEN1 || ''; // Replace with your actual environment variable
    const API_ENDPOINT = process.env.ENDPOINT1 || ''; // Endpoint for the AI content detection API
 
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key is missing from environment variables.' },
        { status: 500 }
      );
    }
 
    // Make the API request to Sapling AI API
    const response = await axios.post(
      API_ENDPOINT,
      {
        key: API_KEY,
        text, // The text from the client
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
 
    // Return the response from the AI detection API
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
 