'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockResults } from './Articles';

export default function SearchArticle() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(mockResults);
  const router = useRouter(); // Add useRouter for navigation

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);
    const filteredResults = mockResults.filter(article =>
      article.title?.toLowerCase().includes(input) ||
      article.authors?.toLowerCase().includes(input) ||
      article.pubyear?.includes(input)
    );
    setResults(filteredResults);
  };

  const handleClick = (id: string) => {
    router.push(`/show-article/${id}`); // Navigate to the article details page using the article id
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <input
          className="search"
          placeholder="Search articles..."
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {results.length > 0 ? (
          results.map(article => (
            <div
              key={article._id}
              className="col-md-4 mb-4"
              onClick={() => handleClick(article._id!)} // Pass the article id on click
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text"><strong>Author:</strong> {article.authors}</p>
                  <p className="card-text"><strong>Year:</strong> {article.pubyear}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
