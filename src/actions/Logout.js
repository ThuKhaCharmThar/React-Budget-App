import { redirect } from "react-router-dom";
import { deleteData } from "../pages/helper";
import { toast } from "react-toastify";

export async function logoutAction(){
    deleteData({
        key:"userName"
    })
    deleteData({
        key:"budgets"
    })
    deleteData({
        key:"expenses"
    })
    toast.success("You're deleted your account")
    return redirect("/")
}