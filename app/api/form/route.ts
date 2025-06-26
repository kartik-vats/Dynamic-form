import { connectToDatabase } from '@/lib/mongodb';
import FormData from '@/models/FormData';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // ✅ Move here
    const data = await req.json();
    const doc = new FormData(data);
    await doc.save();

    return new Response(JSON.stringify({ message: 'Form data saved!', data }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
export async function GET() {
  return new Response("This endpoint only accepts POST requests to submit form data.", {
    status: 200
  });
}
