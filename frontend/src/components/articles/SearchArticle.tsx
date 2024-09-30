'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Article } from "./Articles";

export default function SearchArticle() {
    const [practice, setPractice] = useState(''); // Input for SE Practice
    const [claim, setClaim] = useState(''); // Input for SE Claim
    const [results, setResults] = useState<Article[]>([]);

    const router = useRouter();

    const handleSearch = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles/');

            if (!response.ok) throw new Error('Failed to fetch articles');
    
            const allArticles = await response.json();

            setResults(allArticles.filter((article: Article) =>
                (!practice || article.practice?.toLowerCase().includes(practice.toLowerCase())) &&
                (!claim || article.claim?.toLowerCase() === claim) // Ensure exact match for claim
            ));
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleCardClick = (article: Article) => {
        router.push(`/show-article/${article._id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center"><strong>Search Articles</strong></h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 mb-4">
                        <form>
                            {/* Separate fields for SE Practice and SE Claim */}
                            <div className="mb-3">
                                <label htmlFor="practice" className="form-label">Practice</label>
                                <input
                                    type="text"
                                    id="practice"
                                    className="form-control"
                                    placeholder="Enter SE Practice"
                                    value={practice}
                                    onChange={(e) => setPractice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="claim" className="form-label">Claim</label>
                                <input
                                    type="text"
                                    id="claim"
                                    className="form-control"
                                    placeholder="Enter SE Claim (Agree/Disagree)"
                                    value={claim}
                                    onChange={(e) => setClaim(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                {results.length > 0 ? (
                    results.map(article => (
                        <div key={article._id} className="col-md-4 mb-4">
                            <div className="card h-100" onClick={() => handleCardClick(article)} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>{article.title}</strong></h5>
                                    <p className="card-text"><strong>Author:</strong> {article.authors}</p>
                                    <p className="card-text"><strong>Year:</strong> {article.pubyear}</p>
                                    {/* Display both practice and claim */}
                                    <p className="card-text"><strong>Practice:</strong> {article.practice}</p>
                                    <p className="card-text"><strong>Claim:</strong> {article.claim}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No articles found. Please adjust your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
