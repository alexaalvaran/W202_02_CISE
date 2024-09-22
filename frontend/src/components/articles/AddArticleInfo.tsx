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
        <div className='container'>
            <div className='row'>
                <div className='col-md-10 m-auto'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add Claim & Evidence</h1>
                        <p className='lead text-center'>Article Details</p>
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

                    <tr>
                    <td>Chose an Evidence</td>
                        <select name='evidence' id='evidence'>
                            <option value=''>select</option>
                            <option value='scrum'>Scrum</option>
                            <option value='agile'>Agile</option>
                            <option value='TDD'>TDD</option>
                            <option value='other'>Other</option>
                        </select>
                       </tr>

                    <tr>
                    <td>Chose a Claim</td>
                        <select name='claim' id='claim'>
                            <option value=''>select</option>
                            <option value='Agree'>Agree</option>
                            <option value='Disagree'>Disagree</option>
                        </select>
                    </tr>

                    <button type='submit' 
                    className='btn btn-outline-info btn-lg btn-block'
                    >Update Article
                    </button>
                </tbody>
            </table>  
        </div>
    </div>
    </div>
    </div>
    </div>
    );

}
export default AddArticleInfo;