'use client'

import React, {useState, useEffect} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultArticle } from '../Article';
import Link from 'next/link';
import ArticleCard from '../ArticleCard';


function ShowArticleDetails(){
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{id:string}>().id;
    const navigate = useRouter();

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
            console.log('Error from ShowArticleDetails: ' + err);
        });
    },[id]);
    
    const onDeleteClick = (id: string) => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`, { method: 'DELETE' })
        .then((res) => {
        navigate.push('/');
        })
        .catch((err) => {
        console.log('Error form ShowArticlesDetails_deleteClick: ' + err);
        });
    };


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
        <div className='ShowArticleDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                            </div>

                            <br />
                            <div className='col-md-8 m-auto'>
                                <h1 className='display-4 text-center'>Article Records</h1>
                                <p className='lead text-center'>View Article Details</p>
                            <br />
                            </div>
                                <div className='col-md-10 m-auto'>{ArticleItem}</div>
                                <div className='col-md-6 m-auto'>
                                    <button 
                                    type = 'button'
                                    className='btn btn-outline-danger btn-lg btn block'
                                    onClick={() => {
                                        onDeleteClick(article._id || "");
                                    }}
                                    >Delete Article</button>
                                </div>
                                    <div className='col-md-6 m-auto'>
                                        <Link
                                        href ={`/edit-claims/${article._id}`}
                                        className='btn btn-outline-info btn-lg btn-block'>
                                            Add Claim and Evidence
                                            </Link>
                                    </div>
                </div>
         </div>
    </div>
);

}
export default ShowArticleDetails;