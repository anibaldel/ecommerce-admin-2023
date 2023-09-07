"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from './columns';
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps {
    data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps>=({data})=> {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Tamaños (${data.length})`}
                    description="Administar tamaños para tu store"
                />
                <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="nr-2 h-4 w-4" />
                    Agregar Nuevo
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" description="Api llamadas por sizes" />
            <Separator />
            <ApiList entityIdName="sizeId" entityName="sizes"/>
        </>
    )
}