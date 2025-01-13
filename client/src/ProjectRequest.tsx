import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { FileIcon, Building2Icon, UserIcon, CalendarIcon } from "lucide-react";
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
  start: string;
  attachment: string;
  institutionID: number;
  actorID: number;
  state: string;
}

interface userDTO {
  actorID: number;
  actorEmail: string;
  actorUsername: string;
}

interface InstitutionDTO {
  institutionID: number;
  institutionName: string;
  institutionLink: string;
  ownerID: number;
}

export function ProjectRequest() {
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [institution, setInstitution] = useState<InstitutionDTO | null>(null);
  const [user, setUser] = useState<userDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const projectID = searchParams.get("projectID");

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
        if (!projectResponse.ok)
          throw new Error("Failed to fetch project data");
        const projectData: ProjectDTO = await projectResponse.json();
        setProject(projectData);

        if (projectData.state !== "pending") {
          console.log(
            "Project is not in pending state. Redirecting to dashboard."
          );
          navigate("/dashboard");
          return;
        }

        // Fetch user data
        const userResponse = await fetch(`/api/user/${projectData.actorID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) throw new Error("failed to fetch user data");
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch institution data
        const institutionResponse = await fetch(
          `/api/institution/${projectData.institutionID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!institutionResponse.ok)
          throw new Error("Failed to fetch institution data");
        const institutionData: InstitutionDTO =
          await institutionResponse.json();
        setInstitution(institutionData);

        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [projectID]);

  const handleAction = async (action: "accept" | "reject") => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const newState = action === "accept" ? "active" : "rejected";

      const response = await fetch(`/api/project/change/${projectID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newState), // Sending state as part of the body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project state");
      }

      console.log(`Project ${action}ed successfully`);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        `Error: ${
          err.message || "An error occurred while updating the project state"
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

  if (!project || !institution || !user) {
    return (
      <ErrorDisplay message="No project or institution or user data found" />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Project Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-6 items-center">
            <UserIcon className="text-blue-500 w-6 h-6" />
            <div>
              <span className="font-semibold text-gray-700">
                Requester name:
              </span>
              <span className="ml-2 text-gray-900">{user.actorUsername}</span>
            </div>

            <FileIcon className="text-green-500 w-6 h-6" />
            <div>
              <span className="font-semibold text-gray-700">Project Name:</span>
              <span className="ml-2 text-gray-900">{project.projectName}</span>
            </div>

            <Building2Icon className="text-purple-500 w-6 h-6" />
            <div>
              <span className="font-semibold text-gray-700">Institution:</span>
              <span className="ml-2 text-gray-900">
                {institution.institutionName}
              </span>
            </div>

            <CalendarIcon className="text-orange-500 w-6 h-6" />
            <div>
              <span className="font-semibold text-gray-700">Start Date:</span>
              <span className="ml-2 text-gray-900">
                {new Date(project.start).toLocaleDateString()}
              </span>
            </div>
          </div>

          {project.attachment && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Attachment</h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {project.attachment}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button
            onClick={() => handleAction("accept")}
            className="bg-green-500 hover:bg-green-600"
          >
            Accept
          </Button>
          <Button onClick={() => handleAction("reject")} variant="destructive">
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
          {[...Array(4)].map((_, i) => (
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
