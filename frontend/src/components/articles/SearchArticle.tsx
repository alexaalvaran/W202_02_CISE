'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from './Articles';

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
                (!claim || article.claim?.toLowerCase().includes(claim.toLowerCase())) 
            ));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRowClick = (article: Article) => {
        router.push(`/show-article/${article._id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center"><strong>Search Articles</strong></h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 mb-4">
                        <form>
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
                    <div className="col-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author(s)</th>
                                    <th>Year</th>
                                    <th>Practice</th>
                                    <th>Claim</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(article => (
                                    <tr key={article._id} onClick={() => handleRowClick(article)} style={{ cursor: 'pointer' }}>
                                        <td>{article.title}</td>
                                        <td>{article.authors}</td>
                                        <td>{article.pubyear}</td>
                                        <td>{article.practice}</td>
                                        <td>{article.claim}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="col-12">
                        <p className="text-center">No articles found. Please adjust your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
