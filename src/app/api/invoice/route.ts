import { createInvoice, getInvoice } from '@/actions/invoice';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await createInvoice(Number(body.availableLimit));
    const invoice = await getInvoice();
    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const invoice = await getInvoice();
    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
