import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Uvoz za preusmjeravanje
import './UserForm.css';

const UserForm = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('Researcher');
    const [isEmailReadOnly, setIsEmailReadOnly] = useState<boolean>(false);
    const navigate = useNavigate(); // Preusmjeravanje

    /*useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("/api/user-info", { credentials: "include" });
                if (response.ok) {
                    const userInfo = await response.json();
                    console.log('Response from github: ', userInfo);
                    if (userInfo.email) {
                        setEmail(userInfo.email);
                        setIsEmailReadOnly(true);  // Ako email postoji, polje je readOnly
                    }
                }
            } catch (error) {
                console.error("Not signed in to github, error: ", error);
                navigate('/?from=form'); // Ako korisnik nije prijavljen, prebaci ga na login
            }
        };
        fetchUserInfo();
    }, [navigate]);*/

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("/api/user-info", { credentials: "include" });
                if (response.ok) {
                    const userInfo = await response.json();
                    console.log('Response from github: ', userInfo);
                    if (userInfo.email) {
                        setEmail(userInfo.email);
                        setIsEmailReadOnly(true);  // Ako email postoji, polje je readOnly
                    }
                }
            } catch (error) {
                console.error("Not signed in to github, error: ", error);
            }
        };
        fetchUserInfo();
    }, [navigate]);

    // Funkcija za slanje forme
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', { name, surname, email, role });

        // Podaci koje saljemo na backend
        const userData = {
            name,
            surname,
            email,
            role,
        };

        try {
            // Slanje POST zahtjeva s podacima
            const response = await fetch('/api/lol', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Provjera odgovora s backend-a
            if (response.ok) {
                console.log('User data successfully sent to backend');
                const data = await response.json();
                console.log('Response from backend:', data);
                // Preusmjeravanje na odgovarajuću stranicu prema ulozi
                if (role === 'Researcher') {
                    navigate('/researcher'); // Preusmjeri na Researcher stranicu
                } else if (role === 'Institution Manager') {
                    navigate('/institution-manager'); // Preusmjeri na Institution Manager stranicu
                }
            } else {
                console.error('Error sending data to backend');
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <div>
            <h2>Fill out your information</h2>
            <form onSubmit={handleSubmit}>
                {/* Name input field */}
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Surname input field */}
                <div>
                    <label>Surname</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>

                {/* Email input field */}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={isEmailReadOnly}  // Ako imamo email, polje je readOnly
                        required
                    />
                </div>

                {/* Role dropdown */}
                <div>
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="Researcher">Researcher</option>
                        <option value="Institution Manager">Institution Manager</option>
                    </select>
                </div>

                {/* Submit button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserForm;