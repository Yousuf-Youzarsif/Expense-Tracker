import { ExpenseModel } from "../model/expense.model.js";

export const expenseGet = async (req, res) => {
  try {
    const data = await ExpenseModel.find();
    const expenseData = {
      status: true,
      message: "Data fetch successfully!",
      data: data,
    };
    res.status(200).json(expenseData);
  } catch (error) {
    console.log(error);
  }
};

export const expenseCreate = async (req, res) => {
  const { expenseName, amount, category } = req.body;
  try {
    const ExpenseCrt = await ExpenseModel.create({
      expenseName,
      amount,
      category,
    });
    res.status(200).json(ExpenseCrt);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: "expense not create" });
  }
};

export const expenseDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const expenseDlt = await ExpenseModel.findByIdAndDelete({ _id: id });
    res.status(200).json(expenseDlt);
  } catch (error) {
    res.status(400).json({ status: false, message: "Expense not delete" });
  }
};
