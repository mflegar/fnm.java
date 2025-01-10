import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, CheckCircle, XCircle } from "lucide-react";

interface Notification {
  notificationID: number;
  createdAt: string;
  actorID: number;
  institutionID: number;
}

interface Institution {
  institutionID: number;
  institutionName: string;
  link: string;
  ownerID: number;
}

interface ActorDTO {
  actorID: number;
  actorEmail: string;
  actorUsername: string;
}

interface NotificationsProps {
  institution: Institution; // Accept the whole institution object
}

export function Notifications({ institution }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [actors, setActors] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/notification/institution/${institution.institutionID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchActor = async (actorID: number) => {
    if (actors[actorID]) return;

    try {
      const response = await fetch(`/api/user/${actorID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch actor");
      }

      const actorData: ActorDTO = await response.json();
      setActors((prev) => ({ ...prev, [actorID]: actorData.actorUsername }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (
    action: "accept" | "reject",
    notificationID: number,
    actorID: number
  ) => {
    console.log(
      `${action} clicked for notification ${notificationID} and actor ${actorID}`
    );

    try {
      // Delete the notification first
      const deleteResponse = await fetch(
        `/api/notification/${notificationID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete notification");
      }

      // If action is "accept", send a POST request to join the institution
      if (action === "accept") {
        const postResponse = await fetch(
          `/api/institution/joininstitution/${actorID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(institution.institutionID), // Sending institutionID in the body
          }
        );

        if (!postResponse.ok) {
          throw new Error("Failed to accept and join institution");
        }
      }

      // Remove the notification from the state after action is taken
      setNotifications(
        notifications.filter((n) => n.notificationID !== notificationID)
      );
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [institution]);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!actors[notification.actorID]) {
        fetchActor(notification.actorID);
      }
    });
  }, [notifications, actors]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Notifications to join Institution {institution.institutionName}
        </CardTitle>
        <Button onClick={fetchNotifications} disabled={loading}>
          {loading ? "Loading..." : "Refresh Notifications"}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You're all caught up! No new notifications at the moment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Created At
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Institution ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.notificationID}>
                    <TableCell className="font-medium">
                      {notification.notificationID}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(notification.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {actors[notification.actorID] || "Loading..."}
                    </TableCell>
                    <TableCell>{notification.institutionID}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleAction(
                            "accept",
                            notification.notificationID,
                            notification.actorID
                          )
                        }
                        className="mr-2"
                      >
                        <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleAction(
                            "reject",
                            notification.notificationID,
                            notification.actorID
                          )
                        }
                      >
                        <XCircle className="mr-2 h-5 w-5 text-red-600" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
