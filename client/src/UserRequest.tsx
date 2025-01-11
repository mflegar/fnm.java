import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { UserIcon, FileIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Skeleton } from "./components/ui/skeleton";

interface ProjectDTO {
  projectID: number;
  projectName: string;
}

interface userDTO {
  actorID: number;
  actorEmail: string;
  actorUsername: string;
}

export function UserRequest() {
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [user, setUser] = useState<userDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const projectID = searchParams.get("projectID");
  const actorID = searchParams.get("actorID");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        // Fetch project data
        const projectResponse = await fetch(`/api/project/${projectID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!projectResponse.ok) throw new Error("Failed to fetch project data");
        const projectData: ProjectDTO = await projectResponse.json();
        setProject(projectData);

        // Fetch user data
        const userResponse = await fetch(`/api/user/${actorID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData: userDTO = await userResponse.json();
        setUser(userData);

        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [projectID, actorID]);

  const handleAction = async (accepted: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/project/acceptActor?projectID=${projectID}&actorID=${actorID}&accepted=${accepted}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update actor request");
      }

      console.log(`Actor request ${accepted ? "accepted" : "rejected"} successfully`);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        `Error: ${
          err.message || "An error occurred while updating the actor request"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!project || !user) {
    return <ErrorDisplay message="No project or user data found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            User Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-center">
            The user <span className="font-semibold">{user.actorUsername}</span> has requested to join your project
            <span className="font-semibold"> {project.projectName}</span>. Please review the request below and decide whether to accept or reject it.
          </p>
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-6 items-center">
            <UserIcon className="text-blue-500 w-6 h-6" />
            <div>
              <span className="font-semibold text-gray-700">Requester name:</span>
              <span className="ml-2 text-gray-900">{user.actorUsername}</span>
            </div>

            <FileIcon className="text-green-500 w-6 h-6" />
            <div>
              <span className="font-semibold text-gray-700">Project Name:</span>
              <span className="ml-2 text-gray-900">{project.projectName}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            onClick={() => handleAction(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            Accept
          </Button>
          <Button onClick={() => handleAction(false)} variant="destructive">
            Reject
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p>{message}</p>
    </div>
  );
}
