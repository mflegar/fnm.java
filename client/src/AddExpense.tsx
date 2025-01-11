"use client";

import * as React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Notification {
  type: "success" | "error";
  message: string;
}

export function AddExpense() {
  const [description, setDescription] = React.useState("");
  const [expense, setExpense] = React.useState("");
  const [notification, setNotification] = React.useState<Notification | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [projectID, setProjectID] = React.useState<number | null>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
  };

  const fetchProjectID = async (projectName: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      showNotification("error", "Authentication token not found");
      return;
    }

    try {
      const response = await fetch(`/api/project/name/${projectName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project data");
      }

      const projectData = await response.json();
      setProjectID(projectData.projectID);
    } catch (error) {
      console.error("Error fetching project ID", error);
      showNotification(
        "error",
        "An error occurred while fetching the project data"
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Check for required fields and valid integer expense
    if (
      !description.trim() ||
      !expense.trim() ||
      isNaN(Number(expense)) ||
      Number(expense) <= 0 ||
      !projectID
    ) {
      showNotification(
        "error",
        "Please provide a valid description, positive integer for the expense, and ensure project data is available"
      );
      setIsSubmitting(false);
      return;
    }

    const userData = localStorage.getItem("user");
    localStorage.removeItem("projectName");

    if (!userData || !projectID) {
      showNotification("error", "User data or project ID not found");
      setIsSubmitting(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      const actorID = parsedUser.id;
      const token = localStorage.getItem("token");

      if (!token) {
        showNotification("error", "Authentication token not found");
        setIsSubmitting(false);
        return;
      }

      const expenseData = {
        description,
        expense: Number(expense),
        actorID,
        projectID,
      };

      const response = await fetch("/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        showNotification("success", "Expense added successfully!");
        navigate(-1); // Navigate after success
      } else {
        throw new Error("Failed to submit expense");
      }
    } catch (error) {
      console.error("Error submitting expense", error);
      showNotification(
        "error",
        "An error occurred while submitting the expense"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const projectName = localStorage.getItem("projectName");
    if (projectName) {
      fetchProjectID(projectName);
    }
  }, []); // This runs once when the component mounts

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add Expense
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the expense"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense">Expense Amount</Label>
              <Input
                id="expense"
                type="number"
                placeholder="Enter the expense amount"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                required
              />
            </div>
            {notification && (
              <div
                className={`p-3 rounded-md ${
                  notification.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {notification.message}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleGoBack}
            disabled={isSubmitting}
          >
            Go back
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Expense"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddExpense;
