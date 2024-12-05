import { NextResponse } from 'next/server';
import axios from 'axios';
 
export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { docBase64, reqId, isIOS, docType, orientation } = await req.json();
 
    // Validate required fields
    if (!docBase64 || !reqId || !docType) {
      return NextResponse.json(
        { error: 'Required fields (docBase64, reqId, docType) are missing.' },
        { status: 400 }
      );
    }
 
    // Access environment variables
    const API_ENDPOINT = process.env.ENDPOINT || '';
    const API_TOKEN = process.env.API_TOKEN || '';
 
    if (!API_ENDPOINT || !API_TOKEN) {
      return NextResponse.json(
        { error: 'API credentials are not set in environment variables.' },
        { status: 500 }
      );
    }
 
    // Make the API request
    const response = await axios.post(
      API_ENDPOINT,
      {
        doc_base64: docBase64,
        req_id: reqId,
        isIOS: isIOS || false,
        doc_type: docType,
        orientation: orientation || 0,
      },
      {
        headers: {
          token: API_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
 
    // Return the response from the external API
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Error processing request:', error.response?.data || error.message);
 
    return NextResponse.json(
      { error: 'Failed to process the request. Please try again later.' },
      { status: 500 }
    );
  }
}
 