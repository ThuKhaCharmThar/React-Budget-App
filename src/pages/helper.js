export const waait =()=> new Promise(res=>
  setTimeout(res,Math.random()*800)
  )

// local storage
const generateRandomColor=()=>{
  const existingBudgetLength=fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength *34} 65% 50%`
}

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};
//Get all item from local storage
export const getAllMatchingItems=({category,key,value})=>{
  const data=fetchData(category)?? [];
  return data.filter((item)=>item[key]===value)
}
//deleteitem
export const deleteItem =({key,id})=>{
  const exitingData = fetchData(key);
  if(id){
    const newData =exitingData.filter((item)=>item.id !== id);
    return localStorage.setItem(key,JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
}
//create budget
export const createBudget=({
  name , amount
})=>{
  const newItem={
    id:crypto.randomUUID(),
    name:name,
    createdAt: Date.now(),
    amount : +amount,
    color: generateRandomColor()
  }
  const existingBudgets=fetchData("budgets")??[];
  return localStorage.setItem("budgets",
  JSON.stringify([...existingBudgets, newItem])
  )
}

//delete item
export const deleteData = ({key}) => {
  return localStorage.removeItem(key);
}

// create Expense
export const createExpense=({
  name , amount , budgetId
})=>{
  const newItem={
    id:crypto.randomUUID(),
    name:name,
    createdAt: Date.now(),
    amount : +amount,
    budgetId:budgetId
  }
  const existingExpenses=fetchData("expenses")??[];
  return localStorage.setItem("expenses",
  JSON.stringify([...existingExpenses, newItem])
  )
}
export const calculateSpentByBudget=(budgetId)=>
{
  const expenses=fetchData("expenses")?? [];
  const budgetSpent=expenses.reduce((acc,expense)=>
  {
    //check if expense.id===budgetId I passed in
    if(expense.budgetId !==budgetId)
    {
       return acc
    }
   return acc += expense.amount
  
  }, 0 )
  return budgetSpent;
}
export const formatDateToLocaleString=(epoch)=>
new Date(epoch).toLocaleDateString();

export const formatPercentage=(amt)=>
{
  return amt.toLocaleString(undefined,
  {
    style:"percent",
    minimumFractionDigits:0,
  })
}

export const formatCurrency=(amt)=>
{
  return amt.toLocaleString(undefined,
  {
    style:"currency",
    currency:"USD"
  })
}