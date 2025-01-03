import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./Researcher.css";

type InstitutionDTO = {
  institutionID: string;
  name: string;
  link: string;
};

const Researcher = () => {
  const [institutions, setInstitutions] = useState<InstitutionDTO[]>([]);
  const [isInInstitution, setIsInInstitution] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stompClient, setStompClient] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null); // userId kao state

  // Dohvat tokena iz localStorage
  const token = localStorage.getItem("token");

  // Dohvat korisničkog ID-a iz localStorage
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserId(user.id); // Postavljanje userId iz localStorage
    }
  }, []);

  // Dohvat institucija sa servera
  const fetchInstitutions = async () => {
    try {
      if (!token || !userId) return; // Ako nije dostupan token ili userId, prekinuti

      const response = await fetch("/api/institution/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Dodavanje Authorization header-a
        },
      });
      const data: InstitutionDTO[] = await response.json();

      console.log("Fetched institutions: ", data);

      setInstitutions(data);

      const inInstitution = data.some((inst) => inst.institutionID === userId);
      setIsInInstitution(inInstitution);
    } catch (err) {
      console.error("Fetching institutions failed", err);
    }
  };

  // Spajanje na WebSocket server putem SockJS i STOMP
  const connectWebSocket = () => {
    if (!token) return;

    const socket = new SockJS(`http://localhost:8780/ws?token=${token}`);
    const client = Stomp.over(socket);

    client.connect(
      {}, // Dodavanje Authorization zaglavlja
      () => {
        console.log("Connected to WebSocket server");
        setStompClient(client);
      },
      (error: any) => {
        console.error("WebSocket connection error:", error);
      }
    );
  };

  useEffect(() => {
    if (userId) {
      fetchInstitutions();
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("WebSocket client disconnected");
        });
      }
    };
  }, [userId]); // Ovo će se pokrenuti kada userId bude dostupan

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleJoinClick = (institutionID: string) => {
    if (stompClient && userId) {
      const joinRequest = {
        userID: userId, // ID korisnika iz sesije
      };

      // Slanje zahtjeva na specifičan endpoint za instituciju
      stompClient.send(
        `/app/join/${institutionID}`, // Dinamički endpoint za instituciju
        { Authorization: `Bearer ${token}` }, // Dodavanje Authorization header-a za WebSocket zahtjev
        JSON.stringify(joinRequest)
      );

      console.log(
        `Zahtjev za pridruživanje instituciji ${institutionID} je poslan.`
      );
      closeModal(); // Zatvaranje modala nakon slanja zahtjeva
    }
  };

  return (
    <div className="researcher-container">
      <h1>Available Institutions</h1>

      {isInInstitution ? (
        <p className="status-message">You are already in an institution!</p>
      ) : (
        <button className="join-btn" onClick={openModal}>
          Join Institution
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {institutions.length > 0 ? (
              <>
                <h2>Choose an Institution</h2>

                <div className="institution-grid">
                  {institutions.map((inst) => (
                    <div key={inst.institutionID} className="institution-card">
                      <div className="institution-details">
                        <h2>{inst.name}</h2>
                        <a href={inst.link} target="_blank" rel="noreferrer">
                          Visit Website
                        </a>
                      </div>
                      <button
                        className="join-btn-small"
                        onClick={() => handleJoinClick(inst.institutionID)}
                      >
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h2>No institutions available</h2>
            )}

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Researcher;
