"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";

interface TaskDTO {
  taskID: number;
  projectID: number;
  taskName: string;
  description: string;
  actorID: number;
}

interface ActorDTO {
  actorID: number;
  actorUsername: string;
}

interface TaskManagerProps {
  tasks: TaskDTO[];
}

export const TaskManager = ({ tasks }: TaskManagerProps) => {
  const { projectName } = useParams<{ projectName: string }>();
  const [projectID, setProjectID] = useState<number | null>(null);
  const [actors, setActors] = useState<ActorDTO[]>([]);
  const [selectedActorID, setSelectedActorID] = useState<number | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<TaskDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectID = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/project/name/${projectName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch project ID");

        const data = await response.json();
        setProjectID(data.projectID);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectName) {
      fetchProjectID();
    }
  }, [projectName]);

  useEffect(() => {
    const fetchActors = async () => {
      if (!projectID) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/user/project/${projectID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch actors");

        const data: ActorDTO[] = await response.json();
        setActors(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActors();
  }, [projectID]);

  useEffect(() => {
    if (selectedActorID !== null) {
      // Filter tasks based on the selected actor
      const filtered = tasks.filter((task) => task.actorID === selectedActorID);
      setFilteredTasks(filtered);
    } else {
      // If no actor is selected, do not show any tasks
      setFilteredTasks([]);
    }
  }, [selectedActorID, tasks]);

  const handleEndTask = async (taskID: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/task/delete/${taskID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to end task");

      setFilteredTasks((prev) => prev.filter((task) => task.taskID !== taskID));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = () => {
    if (projectID && selectedActorID !== null) {
      navigate("/task/add", {
        state: {
          projectID,
          actorID: selectedActorID,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <Select
            onValueChange={(value) =>
              setSelectedActorID(value === "all" ? null : Number(value))
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select an actor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actors</SelectItem>
              {actors.map((actor) => (
                <SelectItem
                  key={actor.actorID}
                  value={actor.actorID.toString()}
                >
                  {actor.actorUsername}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddTask}>
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {selectedActorID === null
              ? "Please select an actor to view their tasks."
              : "No tasks found for the selected actor."}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.taskID}>
                  <TableCell className="font-medium">{task.taskName}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {actors.find((actor) => actor.actorID === task.actorID)
                      ?.actorUsername || "Unassigned"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleEndTask(task.taskID)}
                    >
                      End Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
