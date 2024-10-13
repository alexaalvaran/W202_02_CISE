import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Article, DefaultArticle } from '../Article';

function AddArticleInfo() {
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{ id: string }>().id;
    const router = useRouter();

    // Fetch article data when the component mounts
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/acceptArticles/${id}`)
            .then((res) => res.json())
            .then((json) => setArticle(json))
            .catch((err) => console.log('Error from AddArticleInfo: ' + err));
    }, [id]);

    // Handle input changes for text inputs
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };

    // Handle select changes for dropdowns
    const selectOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };

    // Submit form and update article
    // const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    
    //     const emailType = "approved";
    
    //     // Perform the PUT request to update the article
    //     fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/acceptArticles/${id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(article), // Send the article data to update
    //     })
    //     .then((res) => {
    //         if (!res.ok) {
    //             console.log("Failed to update article");
    //             throw new Error("Article update failed");
    //         }
    
    //         //Set up email type and the recipient
    //         const sendEmail = {
    //             email: article.email,
    //             type: emailType,
    //         };
    
    //         // Send the email
    //         return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/notifications`, {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify(sendEmail),
    //         });
    //     })
    //     .then((res) => {
    //         if (!res.ok) {
    //             console.log("Failed to send email");
    //             throw new Error("Email sending failed");
    //         }
    
    //         // Redirect to the article details page
    //         router.push(`/show-articles/${id}`);
    //     })
    //     .catch((err) => {
    //         console.log("Error from AddArticleInfo: " + err);
    //     });
    // };


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const emailType = "approved";
    
        // Perform the PUT request to update the article
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/acceptArticles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article), // Send the article data to update
        })
        .then((res) => {
            if (!res.ok) {
                console.log("Failed to update article");
                throw new Error("Article update failed");
            }
    
    
            // Redirect to the article details page
            router.push(`/show-articles/${id}`);
        })
        .catch((err) => {
            console.log("Error from AddArticleInfo: " + err);
        });
    };

    return (
        <div className='UpdateArticleInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Claim & Evidence Page</h1>
                            <p className='lead text-center'>Article Details</p>
                            <form onSubmit={onSubmit}>
                                <table className='table table-hover table-striped table-bordered'>
                                    <tbody>
                                        <tr>
                                            <td>Title</td>
                                            <td>{article?.title || 'No title available'}</td>
                                        </tr>

                                        <tr>
                                            <td>Author</td>
                                            <td>{article?.authors || 'No author available'}</td>
                                        </tr>

                                        <tr>
                                            <td>Source</td>
                                            <td>{article?.sources || 'No sources available'}</td>
                                        </tr>

                                        <tr>
                                            <td>Publication Year</td>
                                            <td>{article?.pubyear || 'No publication year available'}</td>
                                        </tr>

                                        <tr>
                                            <td>Email</td>
                                            <td>{article?.email || 'No email available'}</td>
                                        </tr>

                                        <tr>
                                            <td>DOI</td>
                                            <td>{article?.doi || 'No DOI available'}</td>
                                        </tr>

                                        {/* Dropdown for Evidence */}
                                        <tr>
                                            <td>
                                                <label htmlFor="evidence">Choose an Evidence</label>
                                            </td>
                                            <td>
                                                <select
                                                    id="evidence"
                                                    name="evidence"
                                                    value={article.evidence || ''}
                                                    onChange={selectOnChange}
                                                >
                                                    <option value="">select</option>
                                                    <option value="scrum">Scrum</option>
                                                    <option value="agile">Agile</option>
                                                    <option value="TDD">TDD</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </td>
                                        </tr>

                                        {/* Dropdown for Claim */}
                                        <tr>
                                            <td>
                                                <label htmlFor="claim">Choose a Claim</label>
                                            </td>
                                            <td>
                                                <input
                                                    placeholder='e.g: improves productivity'
                                                    id="claim"
                                                    name="claim"
                                                    value={article.claim || ''}
                                                    onChange={inputOnChange}
                                                />
                                                
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2}>
                                                <button
                                                    type="submit"
                                                    className="btn btn-outline-info btn-lg btn-block"
                                                >
                                                    Update Article
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArticleInfo;
