"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from './columns';
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorsClientProps {
    data: ColorColumn[];
}

export const ColorsClient: React.FC<ColorsClientProps>=({data})=> {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Colores (${data.length})`}
                    description="Administar colores para tu store"
                />
                <Button onClick={()=> router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="nr-2 h-4 w-4" />
                    Agregar Nuevo
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" description="Api llamadas por colors" />
            <Separator />
            <ApiList entityIdName="colorId" entityName="colors"/>
        </>
    )
}