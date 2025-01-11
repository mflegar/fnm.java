"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Expense {
  expenseID: number;
  description: string;
  expense: number;
  actorID: number;
  projectID: number;
}

interface ExpensesTableProps {
  expenses: Expense[];
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [actorNames, setActorNames] = useState<{ [key: number]: string }>({});
  const pageSize = 7;

  const totalPages = Math.ceil(expenses.length / pageSize);

  const getCurrentPageExpenses = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return expenses.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.expense,
    0
  );

  useEffect(() => {
    const fetchActorNames = async () => {
      const uniqueActorIDs = Array.from(new Set(expenses.map((e) => e.actorID)));
      const fetchedNames: { [key: number]: string } = {};
      const token = localStorage.getItem("token");

      await Promise.all(
        uniqueActorIDs.map(async (actorID) => {
          try {
            const response = await fetch(`/api/user/${actorID}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              fetchedNames[actorID] = data.actorUsername;
            } else {
              console.error(`Failed to fetch actor with ID: ${actorID}`);
              fetchedNames[actorID] = "Unknown";
            }
          } catch (error) {
            console.error(`Error fetching actor with ID: ${actorID}`, error);
            fetchedNames[actorID] = "Unknown";
          }
        })
      );

      setActorNames(fetchedNames);
    };

    fetchActorNames();
  }, [expenses]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {expenses.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          No expenses available.
        </div>
      ) : (
        <>
          <div className="mb-4 text-right">
            <span className="text-lg font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Project ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageExpenses().map((expense) => (
                <TableRow key={expense.expenseID}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>${expense.expense.toFixed(2)}</TableCell>
                  <TableCell>{actorNames[expense.actorID] || "Loading..."}</TableCell>
                  <TableCell>{expense.projectID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 transition-all"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-lg font-semibold">
              {totalPages === 0
                ? "Page 1 of 1"
                : `Page ${currentPage} of ${totalPages}`}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 transition-all"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
