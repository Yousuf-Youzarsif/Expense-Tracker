import mongoose from "mongoose";
const expenseSchema = mongoose.Schema({
  expenseName: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
});

export const ExpenseModel = mongoose.model("expenses", expenseSchema);
