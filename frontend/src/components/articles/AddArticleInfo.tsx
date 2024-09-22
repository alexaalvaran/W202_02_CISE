import React, {useState, useEffect, ChangeEvent, FormEvent, ChangeEventHandler} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultArticle } from './Article';
import Link from 'next/link';

function AddArticleInfo(){
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{ id: string }>().id;
    const router = useRouter();

    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`)
        .then((res)=>{
            return res.json();
        })
        .then((json)=> {
            setArticle(json);
        })
        .catch((err) => {
            console.log('Error from AddArticleInfo: ' + err);
        });
    }, [id]);


const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({...article,[event.target.name]: event.target.value});
};

const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle({...article,[event.target.name]:event.target.value});
}

const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
}

fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `{/api/articles/${id}}`, 
    {method: 'PUT', headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(article)})
    .then((res) => {
        router.push('/show-articles/${id}}');
    })
    .catch((err) => {
        console.log("Error ffrom AddArticleInfo: " + err);
    });


return( 
    <div className='UpdateArticleInfo'>
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

                    <div className='form-group'>
                        <input
                        type='text'
                        placeholder='Enter Claim'
                        name='claim'
                        className='form-control'
                        value={article.claim}
                        onChange={inputOnChange}/>
                        </div>

                    <div className='form-group'>
                        <input
                        type='text'
                        placeholder='Enter Evidence'
                        name='evidence'
                        className='form-control'
                        value={article.evidence}
                        onChange={inputOnChange}/>
                    </div>

                    <button type='submit' 
                    className='btn btn-outline-info btn-lg btn-block'>Update Book</button>
                </tbody>
            </table>
        </div>
        </div>
    );

}
export default AddArticleInfo;