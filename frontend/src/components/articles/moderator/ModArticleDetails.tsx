'use client'

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article, DefaultArticle } from '../Article';
import { send } from 'process';
import React, {ChangeEvent, FormEvent} from "react";

function ModArticleDetails() {
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{ id: string }>().id;
    const navigate = useRouter();
    const router = useRouter();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch article');
                }
                return res.json();
            })
            .then((json) => {
                setArticle(json);
            })
            .catch((err) => {
                console.log('Error from ModArticleDetails: ' + err);
            });
    }, [id]);

    const onDeleteClick = (id: string) => {

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/rejectArticles/${id}`, { method: 'DELETE' })
        .then((res) => {
        navigate.push('/moderate');
        })
        .catch((err) => {
        console.log('Error form ModArticlesDetails_deleteClick: ' + err);
        });
    }

    // const RejectClick = async (id: string) => {
    //     try {
    //         const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/rejectArticles/${id}`, {
    //             method: 'POST',
    //         });

    //         if (!res.ok) {
    //             throw new Error('Failed to reject article');
    //         }
    //         const json = await res.json();
    //         console.log('Article rejected:', json);
    //         router.push('/moderate');
    //     } catch (err) {
    //         console.error('Error from ModArticleDetails_RejectClick:', err);
    //     }
    // };

    // const AcceptClick = async (id: string) => {
    //     try {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acceptArticles/${id}`, {
    //             method: 'POST',
    //         });

    //         if (!res.ok) {
    //             throw new Error('Failed to accept article');
    //         }
    //         const json = await res.json();
    //         console.log('Article accepted:', json);
    //         router.push('/moderate');
    //     } catch (err) {
    //         console.error('Error from ModArticleDetails_AcceptClick:', err);
    //     }
    // };

    const rejectOnClick =  (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()        
            const confirmReject = window.confirm('Are you sure you want to reject this article? \nYou will be redirected to the moderation page after clicking "OK".');
            if (!confirmReject) return;

            fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/rejectArticles/${id}`,{
                method: 'POST',
            }).then((res) => {
                console.log(res);
                if(res.ok)
                {

                    const emailType='rejected';

                    const sendEmail = {
                        email: article.email,
                        type: emailType,
                    }


                    router.push('/moderate');
                    
                    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/notifications`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify(sendEmail), 
                        });
                    /*
                    const articleRes = fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`,{
                        method: 'DELETE',
            
                    });
                    */

                
                }
            }). catch((err) => {
                console.log('Error from reject article');
            });
    }
/* James code
    const RejectClick = async (id: string) => {
        try {
            const articleRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`, {
                method: 'GET',
            });

            
            if (!articleRes.ok) {
                throw new Error('Failed to fetch article');
            }

            const articleData = await articleRes.json();
            console.log('Fetched Article:', articleData);

            const confirmReject = window.confirm('Are you sure you want to reject this article? \nYou will be redirected to the moderation page after clicking "OK".');
            if (!confirmReject) return;

            const rejectRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rejectArticles/${id}`, {
                method: 'POST',
            });

            if (!rejectRes.ok) {
                throw new Error('Failed to reject article');
            }

            const rejectData = await rejectRes.json();
            console.log('Article rejected:', rejectData);

            router.push('/moderate');
        } catch (error) {
            console.error('Error handling article rejection:', error);
        };
    };
*/
/* James code
    const AcceptClick = async (id: string) => {
        try {
            const articleRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`, {
                method: 'GET',
            });

            if (!articleRes.ok) {
                throw new Error('Failed to fetch article');
            }

            const articleData = await articleRes.json();
            console.log('Fetched Article:', articleData);

            const confirmAccept = window.confirm('Are you sure you want to accept this article? \nYou will be redirected to the moderation page after clicking "OK".');
            if (!confirmAccept) return;

            const accpetRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acceptArticles/${id}`, {
                method: 'POST',
            });

            if (!accpetRes.ok) {
                throw new Error('Failed to accept article');
            }

            const acceptData = await accpetRes.json();
            console.log('Article accept:', acceptData);

            router.push('/moderate');
        } catch (error) {
            console.error('Error acceptting article:', error);
        }
    };
*/
    const acceptOnClick = (id:string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const confirmAccept = window.confirm('Are you sure you want to accept this article? \nYou will be redirected to the moderation page after clicking "OK".');
        if(!confirmAccept) return;

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/acceptArticles/${id}`, {
            method: 'POST',
        }).then((res) => {
            console.log(res);
            if(res.ok)
            {
                const emailType = 'analyse';
                const sendEmail = {
                    email: 'ymw7320@autuni.ac.nz',
                    type: emailType,
                }

                router.push('/moderate');

                return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/notifications`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(sendEmail),
                });
            }
        }). catch((err) =>{
            console.log('Error form accept article');
        });
    }

    const ModArticleItem = (
        <div>
            <table className='table table-hover table-striped table-bordered'>
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Title</td>
                        <td>{article?.title || 'No title available'}</td>
                    </tr>
                    <tr>
                        <th scope='colummn'>2</th>
                        <td>Author</td>
                        <td>{article?.authors || 'No author available'}</td>
                    </tr>
                    <tr>
                        <th scope='colummn'>3</th>
                        <td>Source</td>
                        <td>{article?.sources || 'No sources available'}</td>
                    </tr>
                    <tr>
                        <th scope='colummn'>5</th>
                        <td>Publication Year</td>
                        <td>{article?.pubyear || 'No publication year available'}</td>
                    </tr>
                    <tr>
                        <th scope='row'>6</th>
                        <td>Email</td>
                        <td>{article?.email || 'No email available'}</td>
                    </tr>
                    <tr>
                        <th scope='row'>7</th>
                        <td>DOI</td>
                        <td>{article?.doi || 'No DOI available'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className='ModArticleDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Article Details</h1>
                            {ModArticleItem}
                            <button 
                            className='btn btn-danger' 
                            style={{ color: 'black' }}
                            onClick={(event) => rejectOnClick(id, event)}
                            >
                                Reject Article
                            </button>
                            <button
                            className='btn btn-primary float-right' 
                            style={{ color: 'black' }}
                            onClick={(event) => acceptOnClick(id, event)}
                            >
                                Accept Article
                            </button>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-outline-secondary mt-3"
                                onClick={() => router.push('/moderate')}>
                                Return
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModArticleDetails;