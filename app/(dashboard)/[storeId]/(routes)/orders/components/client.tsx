"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from './columns';
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps>=({data})=> {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <Heading 
                title={`Ordenes (${data.length})`}
                description="Administar órdenes para tu store"
            />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data}/>
        </>
    )
}