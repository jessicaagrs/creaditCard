import {
  createPurchaseInstallment,
  getPurchaseInstallments,
} from '@/actions/purcheseInstallment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await createPurchaseInstallment(
      body.description,
      body.value,
      body.installments
    );
    return NextResponse.json(
      { message: 'Compra parcelada criada com sucesso.' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const purchases = await getPurchaseInstallments();
    return NextResponse.json(purchases, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
