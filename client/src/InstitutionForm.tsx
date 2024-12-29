import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './InstitutionForm.css';

const InstitutionForm = () => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const id = Number(sessionStorage.getItem('userID'));

    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', { name, link , id});

        const institutionData = {
            name,
            link,
            id,
        };

        console.log('Institution data being sent:', institutionData);

        try {
            const response = await fetch('/api/institution/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(institutionData)
            });

            if (response.ok) {
                console.log('Institution data successfully sent to backend');
                const data = await response.text();
                console.log('Response from backend:', data);
                navigate('/institution-manager');
            } else {
                console.error('Error sending data to backend');
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Institution Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>Website Link:
                <input type="url" value={link} onChange={e => setLink(e.target.value)} />
            </label>
            <button type="submit">Create Institution</button>
        </form>
    );
};

export default InstitutionForm;