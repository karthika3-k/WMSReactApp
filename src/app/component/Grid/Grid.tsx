import { useState } from "react";

interface RowData{
    [key:string]:any;
}
 interface Column{
    name:string;
    fiels:string;
    visible:boolean;
 }

interface GridProps<T extends RowData>{
    gridKey:string;
    title:string;
    data:T[];
    columnConfig:Column[];
    rowPerPage:number;
    onDelete:(rowdata:T)=>void;
    handleAddClick:()=>void;
    addButtonLabel:string;
    handleEditClick:(rowdata: T)=>void;
}
const Grid=<T extends RowData>({gridKey,title,data,columnConfig,rowPerPage,onDelete,handleAddClick,addButtonLabel,handleEditClick}
    :GridProps<T>)=>{
        const[columns, setColumns]=useState(columnConfig);
        // const[currentPage, setCurrentPage]=
    return(
        <div></div>
    );
}
export default Grid;