'use client'

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Article, DefaultArticle } from '../Article';


function ShowArticleDetails(){
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{id:string}>().id;
    const navigate = useRouter();
    const router = useRouter();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/acceptArticles/${id}`)
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
            console.log('Error from ShowArticleDetails: ' + err);
        });
    },[id]);
    
    const onDeleteClick = (id: string) => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/rejectArticles/${id}`, { method: 'POST' })
        .then((res) => {
        navigate.push('/analyse');
        })
        .catch((err) => {
        console.log('Error form ShowArticlesDetails_deleteClick: ' + err);
        });
    };

    const submitClick = async (id: string, event:React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault()

        const confirmAccept = window.confirm('Are you sure you want to accept this article? \nYou will be redirected to the moderation page after clicking "OK".');
        if (!confirmAccept) return;

        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/mainArticles/${id}`, {
            method: 'POST'
        }).then((res) => {
            console.log(res);
            if(res.ok)
            {

                const emailType='approved';

                const sendEmail = {
                    email: article.email,
                    type: emailType,
                }

                router.push('/analyse');

                return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/notifications`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                     body: JSON.stringify(sendEmail), 
                    });
            }
        }). catch((err) => {
            console.log('error from show article details');
        });
    }  

        /*
        try {
            const articleRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acceptArticles/${id}`, {
                method: 'GET',
            });

            if (!articleRes.ok) {
                throw new Error('Failed to fetch article');
            }

            const articleData = await articleRes.json();
            console.log('Fetched Article:', articleData);

            const confirmAccept = window.confirm('Are you sure you want to accept this article? \nYou will be redirected to the moderation page after clicking "OK".');
            if (!confirmAccept) return;

            const accpetRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mainArticles/${id}`, {
                method: 'POST',
            });

            if (!accpetRes.ok) {
                throw new Error('Failed submitting article');
            }

            const acceptData = await accpetRes.json();
            console.log('Article accept:', acceptData);
            router.push('/analyse');

            const emailType = "accepted";
        const sendEmail = {
            email: articleData.email,  // Use the fetched article's email
            type: emailType,
        };

        // Send the email notification
        const emailRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendEmail),
        });

        if (!emailRes.ok) {
            throw new Error('Failed to send email');
        }

        console.log('Email sent successfully');

        } catch (error) {
            console.error('Error acceptting article:', error);
        }
    };
*/

    const ArticleItem = (
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
                    <tr>
                        <th scope='row'>8</th>
                        <td>Evidence</td>
                        <td>{article?.evidence || 'No evidence available'}</td>
                    </tr>
                    <tr>
                        <th scope='row'>9</th>
                        <td>Claim</td>
                        <td>{article?.claim || 'No claim available'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className='ShowArticleDetials'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Article Details</h1>
                            {ArticleItem}
                            <div className="row mt-3">
                                
                        
                               
                                <div className="col text-center">
                                    <button
                                        className='btn btn-primary'
                                        style={{ color: 'black' }}
                                        onClick={() => navigate.push(`/edit-claims/${id}`)}
                                    >
                                        Add Claim and Evidence
                                    </button>                       
                                </div>
                         
                                <div className="col text-center">
                                    <button
                                        className='btn btn-warning'
                                        style={{ color: 'black' }}
                                        onClick={(event) => submitClick(id, event)}
                                    >
                                        Submit to Main Articles
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShowArticleDetails;