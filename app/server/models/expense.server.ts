import { Expense } from "@prisma/client";
import { prisma } from "../db.server";

type CreateExpenseType = Pick<
  Expense,
  "name" | "billingDay" | "price" | "userId" | "billingType" | "type"
>;
const createExpense = async (expense: CreateExpenseType) => {
  return prisma.expense.create({ data: expense });
};

const findExpensesByUserId = async (userId: string) => {
  const expenses = await prisma.expense.findMany({ where: { userId } });
  return expenses.map((expense) => {
    return {
      ...expense,
      price: Number(expense.price),
      updatedAt: expense.updatedAt.toJSON(),
      createdAt: expense.createdAt.toJSON(),
    };
  });
};

const findExpenseById = async (id: string, userId: string) => {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (expense?.userId !== userId) throw new Error("Access denied");
  return {
    ...expense,
    price: Number(expense.price),
    updatedAt: expense.updatedAt.toJSON(),
    createdAt: expense.createdAt.toJSON(),
  };
};

const deleteExpenseById = async (expenseId: string, userId: string) => {
  const expense = await prisma.expense.findUnique({ where: { id: expenseId } });
  if (!expense) throw new Error("Expense not found");
  if (expense.userId !== userId) throw new Error("Access denied");

  return await prisma.expense.delete({ where: { id: expense.id } });
};

export {
  createExpense,
  findExpensesByUserId,
  findExpenseById,
  deleteExpenseById,
};
