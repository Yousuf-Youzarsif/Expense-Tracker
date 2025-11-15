import express from "express";
import {
  expenseGet,
  expenseCreate,
  expenseDelete,
} from "../controllers/expense.controller.js";
const Router = express.Router();
Router.get("/expense", expenseGet);
Router.post("/expense/create", expenseCreate);
Router.delete("/expense/delete/:id", expenseDelete);

export default Router;
