'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from './Article';

export default function SearchRejectedArticles() {
    const [title, setTitle] = useState('');  
    const [author, setAuthor] = useState('');  
    const [results, setResults] = useState<Article[]>([]);

    const router = useRouter();

    const handleSearch = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/rejectArticles/');

            if (!response.ok) throw new Error('Failed to fetch rejected articles');

            const allRejectedArticles = await response.json();

            setResults(allRejectedArticles.filter((article: Article) => {
                const authorsArray = article.authors ? article.authors.split(',').map(auth => auth.trim()) : [];  // Split authors string
                return (!title || article.title?.toLowerCase().includes(title.toLowerCase())) &&
                    (!author || authorsArray.some((auth: string) => auth.toLowerCase().includes(author.toLowerCase())));
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleReturn = () => {
        router.push('/moderate');  
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center"><strong>Search Rejected Articles</strong></h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 mb-4">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Article Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    placeholder="Enter Article Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author(s)</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="form-control"
                                    placeholder="Enter Author Name"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
                            </div>
                        </form>
                        <div className="d-flex justify-content-end mt-3">
                            <button type="button" className="btn btn-outline-secondary" onClick={handleReturn}>Return</button>
                        </div>
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
                                    <th>Rejection Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(article => (
                                    <tr key={article._id}>
                                        <td>{article.title}</td>
                                        <td>{article.authors ? article.authors.split(',').join(', ') : ''}</td>
                                        <td>{article.pubyear}</td>
                                        <td>{(article as any).rejectedDate ? new Date((article as any).rejectedDate).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="col-12">
                        <p className="text-center">No rejected articles found. Please adjust your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
