'use client'

import React, {useState, useEffect} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultArticle } from './Article';
import Link from 'next/link';

function ShowArticleDetails(){
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{id:string}>().id;
    const navigate = useRouter();

    useEffect(() => {
        fetch((process.env.NEXT_PUBLIC_BACKEND + 'api/articles/${id}'))
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            setArticle(json);
        })
        .catch((err) => {
            console.log("Error from ShowArticleDetails" + err);
        });
    },[id]);



    const ArticleItem = (
        <div>
            <table className='table table-hover table-dark table-striped table-bordered'>
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Title</td>
                        <td>(article.title)</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Author</td>
                        <td>{article.authors}</td>
                    </tr>
                    <tr>
                        <th scope='row'>3</th>
                        <td>Source</td>
                        <td>{article.sources}</td>
                    </tr>
                    <tr>
                        <th scope='row'>5</th>
                        <td>Publication Year</td>
                        <td>{article.pubyear}</td>
                    </tr>
                    <tr>
                        <th scope='row'>6</th>
                        <td>Email</td>
                        <td>{article.email}</td>
                    </tr>
                    <tr>
                        <th scope='row'>7</th>
                        <td>DOI</td>
                        <td>{article.doi}</td>
                    </tr>
                    <tr>
                        <th scope='row'>8</th>
                        <td>Claim</td>
                        <td>{article.claim}</td>
                    </tr>
                    <tr>
                        <th scope='row'>9</th>
                        <td>Evidence</td>
                        <td>{article.evidence}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div
        className='ShowBookDetails'>
        <div
        className='container'>
        <div
        className='row'>
        <div
        className='col-md-10 m-auto'>
        <br /> <br />
        <Link
        href='/'
        className='btn btn-outline-warning float-left'>
        Show Book List
        </Link>
        </div>
        <br />
        <div
        className='col-md-8 m-auto'>
        <h1
        className='display-4 text-center'>Book&quot;s Record</h1>
        <p
        className='lead text-center'>View Book&quot;s Info</p>
        <hr /> <br />
        </div>
        <div
        className='col-md-10 m-auto'>{ArticleItem}</div>
        <div
        className='col-md-6 m-auto'>

        </div>
        <div className='col-md-6 m-auto'>
            <Link
            href={`/edit-book/${article._id}`} className='btn btn-outline-info btn-lg btn-block'>
                Edit Article
                </Link>
                </div>
             </div>
         </div>
    </div>
);

}
export default ShowArticleDetails;