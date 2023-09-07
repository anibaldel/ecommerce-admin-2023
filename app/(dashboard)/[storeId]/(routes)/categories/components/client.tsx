"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from './columns';
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps>=({data})=> {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Categorias (${data.length})`}
                    description="Administar categorias para tu store"
                />
                <Button onClick={()=> router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="nr-2 h-4 w-4" />
                    Agregar Nuevo
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data}/>
            <Heading title="API" description="Api llamadas por categorias" />
            <Separator />
            <ApiList entityIdName="categoryId" entityName="categories"/>
        </>
    )
}