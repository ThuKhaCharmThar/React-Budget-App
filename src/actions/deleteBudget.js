import React from 'react'
import { deleteItem, getAllMatchingItems } from '../pages/helper'
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

 export function deleteBudget({params}){
    try
    {
        deleteItem({
            key:"budgets",
            id:params.id,
        });
        const associatedExpenses=getAllMatchingItems({
            category:"expenses",
            key:"budgetId",
            value:params.id,
        });
        associatedExpenses.forEach((expense)=>{
            deleteItem(
                {
                    key:"expenses",
                    id:expense.id,
                }
            );
        });
        toast.success("Budget deleted successfully!");

    }
    catch(e)
    {
        throw new Error("There was a problem deleteing your budget");
    }
    return redirect("/");
}