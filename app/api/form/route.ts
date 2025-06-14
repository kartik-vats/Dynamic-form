import { connectToDatabase } from '@/lib/mongodb';
import FormData from '@/models/FormData';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectToDatabase();
    await FormData.create(data);
    return new Response(JSON.stringify({ message: 'Form data saved!' }), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
