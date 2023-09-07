import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const body = await req.json();
  console.log(body);
  const { name, address, phone, city, productIds } = body;

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids es requerido", { status: 400 });
  }

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      name,
      address,
      phone,
      city,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });


  return NextResponse.json(order, {
    headers: corsHeaders
  });
}