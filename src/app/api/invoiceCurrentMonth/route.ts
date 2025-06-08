import { getInvoiceCurrentMonth } from '@/actions/invoice';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getInvoiceCurrentMonth();
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
