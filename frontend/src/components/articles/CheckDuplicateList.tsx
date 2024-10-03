import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from './Article';

function CheckDuplicateList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [duplicateArticles, setDuplicateArticles] = useState<Article[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch all articles
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

    // Function to find duplicate articles based on title
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
    };

    // Function to remove the rejected article from the list without redirecting
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

            // Remove the rejected article from the duplicate list
            setDuplicateArticles((prevArticles) => prevArticles.filter(article => article._id !== _id));
        } catch (error) {
            console.error('Error rejecting article:', error);
        }
    };

    const handleReturn = () => {
        router.push('/moderate');
    };

    return (
        <div className='CheckDuplicateList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Duplicate Articles</h2>

                        {/* Return button */}
                        <div className='text-center'>
                            <button className='btn btn-outline-secondary m-2' onClick={handleReturn}>
                                Return to Moderate
                            </button>
                        </div>

                        {duplicateArticles.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author(s)</th>
                                            <th>Year</th>
                                            <th>Claim</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {duplicateArticles.map((article, k) => (
                                            <tr key={k}>
                                                <td>{article.title}</td>
                                                <td>{article.authors}</td>
                                                <td>{article.pubyear}</td>
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
