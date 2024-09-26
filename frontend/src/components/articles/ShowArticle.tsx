'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // useRouter to navigate back
import { Article } from './Articles'; // Assuming you have an Article type

export default function ShowArticle() {
    const { id } = useParams(); // Get the ID from the route
    const [article, setArticle] = useState<Article | null>(null);
    const router = useRouter(); // To navigate between pages
    
    /* useEffect(() => {
        // Ensure that the component is mounted and id exists
        if (id) {
            const foundArticle = mockResults.find((article) => article._id === id);
            setArticle(foundArticle || null);
        }
    }, [id]); */


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:2002/api/articles/${id}`);
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
    
        if (id) {
            fetchArticle();
        }
    }, [id]);
    

    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-12" style={{ maxWidth: '600px', width: '100%' }}>
                <h1><strong>{article.title}</strong></h1>
                <p><strong>Author:</strong> {article.authors}</p>
                <p><strong>Publication Year:</strong> {article.pubyear}</p>
                <p><strong>DOI:</strong> {article.doi}</p>
                <p><strong>Claim:</strong> {article.claim}</p>
                <p><strong>Evidence:</strong> {article.evidence}</p>
                <button
                    className="btn btn-secondary mt-3"
                    onClick={() => router.push('/search')} // Navigate to /search page
                >
                    Return to Search
                </button>
            </div>
        </div>
    );
}