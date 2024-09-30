'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // useRouter to navigate back
import { Article } from './Articles'; // Assuming you have an Article type

export default function ShowArticle() {
    const { id } = useParams(); // Get the ID from the route
    const [article, setArticle] = useState<Article | null>(null);
    const router = useRouter(); // To navigate between pages


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`);
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
                <h1><strong>Title:</strong> {article.title} </h1>
                <p><strong>Author:</strong> {article.authors}</p>
                <p><strong>Publication Year:</strong> {article.pubyear}</p>
                <p><strong>Email:</strong> {article.email}</p>
                <p><strong>DOI:</strong> {article.doi}</p>
                <p><strong>Practice:</strong> {article.practice}</p>
                <p><strong>Claim:</strong> {article.claim}</p>
                <p><strong>Evidence:</strong> {article.evidence}</p>
                <div className="d-flex justify-content-end">
                <button
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => router.push('/search')} // Navigate to /search page
                >
                    Return
                </button>
                </div>
            </div>
        </div>
    );
}