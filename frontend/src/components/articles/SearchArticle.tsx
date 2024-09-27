'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Article } from "./Articles";

export default function SearchArticle() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pubYear, setPubYear] = useState('');
    const [searchType, setSearchType] = useState('practice'); // New state for search type (SE Practice/Claim)
    const [searchInput, setSearchInput] = useState(''); // Input for claim or practice
    const [results, setResults] = useState<Article[]>([]);

    const router = useRouter();

    const handleSearch = async () => {
        try {
            /* const response = await fetch('http://localhost:2002/api/articles/'); */
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles/');

            if (!response.ok) throw new Error('Failed to fetch articles');
    
            const allArticles = await response.json();
    
            setResults(allArticles.filter((article: Article) =>
                (!title || article.title?.toLowerCase().includes(title.toLowerCase())) &&
                (!author || article.authors?.toLowerCase().includes(author.toLowerCase())) &&
                (!pubYear || article.pubyear === pubYear) &&
                (searchType === 'practice'
                    ? article.practice?.toLowerCase().includes(searchInput.toLowerCase()) 
                    : article.claim?.toLowerCase().includes(searchInput.toLowerCase()))
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
            <h2 className="mb-4 text-center">Search Articles</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 mb-4">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    placeholder="Enter article title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="form-control"
                                    placeholder="Enter author's name"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pubYear" className="form-label">Publication Year</label>
                                <input
                                    type="number"
                                    id="pubYear"
                                    className="form-control"
                                    placeholder="Enter publication year"
                                    value={pubYear}
                                    onChange={(e) => setPubYear(e.target.value)}
                                />
                            </div>
                            {/* Dropdown to select between SE Practice or SE Claim */}
                            <div className="mb-3">
                                <label htmlFor="searchType" className="form-label">Search By</label>
                                <select
                                    id="searchType"
                                    className="form-select"
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value)}
                                >
                                    <option value="practice">SE Practice</option>
                                    <option value="claim">SE Claim</option>
                                </select>
                            </div>
                            {/* Input for either SE Practice or SE Claim */}
                            <div className="mb-3">
                                <label htmlFor="searchInput" className="form-label">
                                    {searchType === 'practice' ? 'Software Engineering Practice' : 'Software Engineering Claim'}
                                </label>
                                <input
                                    type="text"
                                    id="searchInput"
                                    className="form-control"
                                    placeholder={searchType === 'practice' ? 'Enter SE Practice' : 'Enter SE Claim'}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
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
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text"><strong>Author:</strong> {article.authors}</p>
                                    <p className="card-text"><strong>Year:</strong> {article.pubyear}</p>
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
