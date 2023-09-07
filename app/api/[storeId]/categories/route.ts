import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
   req: Request,
   { params } : { params: { storeId: string }} 
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, billboardId } = body;

        if(!userId) {
            return new NextResponse("No autenticado", { status: 401 }) 
        }

        if(!name) {
            return new NextResponse("El nombre es requerido", { status: 400 }) 
        }
        if(!billboardId) {
            return new NextResponse("El billboard Id es requerido", { status: 400 }) 
        }

        if(!params.storeId) {
            return new NextResponse("Store id es requerido", { status: 400 }) 
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("No autorizado", { status: 403 }) 
        }

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_POST]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params } : { params: { storeId: string }} 
 ) {
     try {

         if(!params.storeId) {
             return new NextResponse("Store id es requerido", { status: 400 }) 
         }
         const categories = await prismadb.category.findMany({
             where: {
                 storeId: params.storeId
             }
         })
         return NextResponse.json(categories);
     } catch (error) {
         console.log('[CATEGORY_GET]', error);
         return new NextResponse("Internal error", { status: 500 })
     }
 }