import React from "react";
import {
  createBudget,
  fetchData,
  waait,
  createExpense,
  deleteItem,
} from "./helper";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was an error creating your account");
    }
  }
  // Budget
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Created");
    } catch (e) {
      throw new Error("There was an error creating your Budget");
    }
  }
  // Expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success("Expense Created");
    } catch (e) {
      throw new Error("There was an error creating your Expense");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense Deleted");
    } catch (e) {
      throw new Error("There was an error deleting your Expense");
    }
  }
}
function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <div>
      <main>
        {userName ? (
          <div className="dashboard">
            <h1>
              Welcome Back,<span className="accent">{userName}</span>
            </h1>
            <div className="grid-sm">
              {budgets && budgets.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                  <h2>Exiting Budget</h2>
                  <div className="budgets">
                    {budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))}
                  </div>
                  {expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                        expenses={expenses
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 3)}
                      />
                      {expenses.length > 3 && (
                        <Link to="expenses" className="btn btn--dark">
                          View all expenses
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom.</p>
                  <p>Create a budget to get started!</p>
                  <AddBudgetForm />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Intro />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
