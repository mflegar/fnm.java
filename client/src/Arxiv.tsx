import { useState } from "react";
import './arxiv.css';

const ArxivSearch = () => {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("cs.AI");
    const [maxResults, setMaxResults] = useState(5);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query) {
            alert("Please enter a search query.");
            return;
        }
        try {
            const response = await fetch(
                `api/arxiv/search?query=${encodeURIComponent(query)}&category=${category}&maxResults=${maxResults}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch results.");
            }
            const data = await response.json();
            setResults(data);
        } catch (err) {
            console.error(err);
            setError("Error fetching results. Please try again.");
        }
    };

    const toggleSummary = (index) => {
        const updatedResults = [...results];
        updatedResults[index].showFull = !updatedResults[index].showFull;
        setResults(updatedResults);
    };

    return (
        <div className="container">
            <h1>Search ArXiv</h1>
            <input
                type="text"
                placeholder="Enter keywords"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="cs.AI">Artificial Intelligence</option>
                <option value="cs.CV">Computer Vision</option>
                <option value="cs.CL">Natural Language Processing</option>
                <option value="cs.LG">Machine Learning</option>
            </select>
            <input
                type="number"
                min="1"
                max="100"
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <a href={result.link} target="_blank" rel="noopener noreferrer">
                            {result.title}
                        </a>
                        <p
                            onClick={() => toggleSummary(index)}
                            style={{ cursor: "pointer", color: "blue" }}
                        >
                            {result.showFull
                                ? result.summary
                                : `${result.summary.split(". ").slice(0, 2).join(". ")}...`}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArxivSearch;
