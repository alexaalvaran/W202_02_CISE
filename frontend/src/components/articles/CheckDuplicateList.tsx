import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from './Articles';

function CheckDuplicateList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [duplicateArticles, setDuplicateArticles] = useState<Article[]>([]);
    const [searchPractice, setSearchPractice] = useState('');
    const [searchClaim, setSearchClaim] = useState('');
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles`)
            .then((res) => res.json())
            .then((articles) => {
                setArticles(articles);
                findDuplicates(articles);
            })
            .catch((err) => {
                console.log('Error fetching articles: ' + err);
            });
    }, []);

    const findDuplicates = (articles: Article[]) => {
        const seenTitles = new Set();
        const duplicates = articles.filter((article) => {
            if (seenTitles.has(article.title)) {
                return true;
            } else {
                seenTitles.add(article.title);
                return false;
            }
        });
        setDuplicateArticles(duplicates);
        setFilteredArticles(duplicates);
    };

    const RejectClick = async (_id: string) => {
        try {
            const confirmReject = window.confirm('Are you sure you want to reject this article?');
            if (!confirmReject) return;

            const rejectRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rejectArticles/${_id}`, {
                method: 'POST',
            });

            if (!rejectRes.ok) {
                throw new Error('Failed to reject article');
            }

            const rejectData = await rejectRes.json();
            console.log('Article rejected:', rejectData);

            setDuplicateArticles((prevArticles) => prevArticles.filter(article => article._id !== _id));
            setFilteredArticles((prevArticles) => prevArticles.filter(article => article._id !== _id));
        } catch (error) {
            console.error('Error rejecting article:', error);
        }
    };

    const handleReturn = () => {
        router.push('/moderate');
    };

    const handleSearch = async () => {
        try {
            const filtered = duplicateArticles.filter(article => {
                return (
                    (searchPractice === '' || article.practice?.toLowerCase().includes(searchPractice.toLowerCase())) &&
                    (searchClaim === '' || article.claim?.toLowerCase().includes(searchClaim.toLowerCase()))
                );
            });
            setFilteredArticles(filtered);
        } catch (error) {
            console.error('Error filtering articles:', error);
        }
    };

    return (
        <div className='CheckDuplicateList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Duplicate Articles</h2>
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
                                                value={searchPractice}
                                                onChange={(e) => setSearchPractice(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="claim" className="form-label">Claim</label>
                                            <input
                                                type="text"
                                                id="claim"
                                                className="form-control"
                                                placeholder="Enter SE Claim"
                                                value={searchClaim}
                                                onChange={(e) => setSearchClaim(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
                                        </div>
                                    </form>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button type="button" className='btn btn-outline-secondary' onClick={handleReturn}>
                                            Return
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {filteredArticles.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author(s)</th>
                                            <th>Year</th>
                                            <th>Practice</th>
                                            <th>Claim</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredArticles.map((article, k) => (
                                            <tr key={k}>
                                                <td>{article.title}</td>
                                                <td>{article.authors}</td>
                                                <td>{article.pubyear}</td>
                                                <td>{article.practice}</td>
                                                <td>{article.claim}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => RejectClick(article._id || '')}>
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className='text-center'>No duplicate articles found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckDuplicateList;
