import { useState } from "react";
import "./arxiv.css";

interface Result {
  title: string;
  link: string;
  summary: string;
  showFull?: boolean;
}

const ArxivSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("cs.AI");
  const [maxResults, setMaxResults] = useState<number>(5);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Dodano stanje za praćenje učitavanja

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    setIsLoading(true); // Postavi isLoading na true kad pretraga počne

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await fetch(
        `/api/arxiv/search?query=${encodeURIComponent(
          query
        )}&category=${category}&maxResults=${maxResults}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results.");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error during search:", err);
      setError("Error fetching results. Please try again.");
    } finally {
      setIsLoading(false); // Postavi isLoading na false kad pretraga završi
    }
  };

  const toggleSummary = (index: number) => {
    const updatedResults = [...results];
    updatedResults[index].showFull = !updatedResults[index].showFull;
    setResults(updatedResults);
  };

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="header-title">Search ArXiv</h1>
      </div>
      <div className="form-container">
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
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Prikaz "Loading..." ako je u tijeku učitavanje */}
      {isLoading && <p>Loading...</p>}

      <ul id="search-results">
        {results.map((result, index) => (
          <li key={index} className="result-item">
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="result-title"
            >
              {result.title}
            </a>
            <p onClick={() => toggleSummary(index)} className="result-summary">
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
