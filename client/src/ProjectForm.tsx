import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router"

export function ProjectForm() {
  const [name, setName] = React.useState("")
  const [attachment, setAttachment] = React.useState("")
  const navigate = useNavigate()

  // Funkcija za navigaciju na prethodnu rutu
  const handleGoBack = () => {
    const previousRoute = localStorage.getItem("previousRoute");
    localStorage.removeItem("previousRoute");
    localStorage.removeItem("institutionName")
    navigate(previousRoute || "/dashboard") // Ako nije postavljena prethodna ruta, vrati se na /dashboard
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Sprječava slanje forme i ponovno učitavanje stranice
  
    const userData = localStorage.getItem("user");
    const name = localStorage.getItem("institutionName");
  
    if (userData && name) {
      try {
        const parsedUser = JSON.parse(userData);
        const actor_id = parsedUser.id;
  
        // Dohvati token za autorizaciju
        const token = localStorage.getItem("token");
  
        if (token) {
          // 1. Dohvati institutionID putem GET zahtjeva prema API-u
          const institutionResponse = await fetch(`/api/institution/name/${name}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Autorizacija s tokenom
            },
          });
  
          if (institutionResponse.ok) {
            const institutionData = await institutionResponse.json();
            console.log(institutionData)
            const institution_id = institutionData.institutionID; // Pretpostavljamo da API vraća objekt s id
  
            // 2. Definiraj podatke o projektu s institutionID
            const projectData = {
              name,
              attachment,
              actor_id, // Mozda se promijeni na backendu
              institution_id, // Mozda se promijeni na backendu
            };

            console.log(projectData)
  
            // 3. Pošaljite POST zahtjev za dodavanje projekta
            const response = await fetch("/api/projects/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(projectData),
            });
  
            if (response.ok) {
              // Ako je odgovor uspješan
              console.log("Project submitted successfully!");
              localStorage.removeItem("institutionName");
              const previousRoute = localStorage.getItem("previousRoute");
              localStorage.removeItem("previousRoute");
              navigate(previousRoute || "/dashboard"); // Ako nije postavljena prethodna ruta, vrati se na /dashboard
            } else {
              // Ako nešto pođe po zlu
              console.log("Failed to submit project");
            }
          } else {
            console.log("Failed to fetch institution ID");
          }
        } else {
          console.log("Token not found");
        }
      } catch (error) {
        console.log("Error submitting project", error);
      }
    } else {
      console.log("User data or institution name not found");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Name of your project" 
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="attachment">Attachment</Label>
                <Textarea 
                  id="attachment" 
                  placeholder="Project attachment" 
                  value={attachment}
                  onChange={(e) => setAttachment(e.target.value)} 
                  className="mb-6" // Dodaj margine na dnu Textarea
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4"> {/* Dodan margin-top za razmak između dugmadi i forme */}
              <Button variant="outline" onClick={handleGoBack}>Go back</Button>
              <Button type="submit">Submit project</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectForm