"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from './columns';
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
    data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps>=({data})=> {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Carteleras (${data.length})`}
                    description="Administar cartelera para tu store"
                />
                <Button onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="nr-2 h-4 w-4" />
                    Agregar Nuevo
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data}/>
            <Heading title="API" description="Api llamadas por billboards" />
            <Separator />
            <ApiList entityIdName="billboardId" entityName="billboards"/>
        </>
    )
}