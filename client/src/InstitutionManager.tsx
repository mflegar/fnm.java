import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const InstitutionManager = () => {
  const [stompClient, setStompClient] = useState<any>(null);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const ownerID = 1; // Dohvaćanje ownerID iz sessionStorage

  const token = localStorage.getItem("token");

  // Provjera je li ownerID dostupan
  if (!ownerID) {
    console.error("User ID not found in sessionStorage!");
    return <p>Error: User ID is missing. Please log in again.</p>;
  }

  // Dohvati sve institucije vlasnika sa backend-a
  const fetchInstitutions = async () => {
    try {
      const response = await fetch(`/api/institution/owner/${ownerID}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  // Dodaj token u zaglavlje
        },
      });
      const data = await response.json();

      if (data) {
        setInstitutions(data);
        console.log(data)
      }
    } catch (error) {
      console.error("Failed to fetch institutions", error);
    }
  };

  /*const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8780/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log("Connected to WebSocket server");

        // Subscribe na `/topic/join/{ownerID}`
        client.subscribe(`/topic/join/${ownerID}`, (message) => {
          try {
            const notification = JSON.parse(message.body);
            console.log(`Notification received: ${notification.message}`);
          } catch (error) {
            console.error("Failed to parse message:", message.body);
          }
        });

        setStompClient(client);
      },
      (error: any) => {
        console.error("WebSocket connection error:", error);
      }
    );
  };*/

  useEffect(() => {
    fetchInstitutions().then(() => {
      //connectWebSocket();
    });

    /*return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("WebSocket client disconnected");
        });
      }
    };*/
  }, []);

  return (
    <div>
      <h1>Institution Manager</h1>
      <p>Listening for join requests...</p>
      <h2>Your Institutions:</h2>
      <ul>
        {institutions.map((inst) => (
          <li key={inst.institutionID}>
            {inst.institutionName} (ID: {inst.institutionID})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstitutionManager;
