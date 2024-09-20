import React, {useState, useEffect, ChangeEvent, FormEvent, ChangeEventHandler} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultArticle } from './Article';
import Link from 'next/link';

function AddArticleInfo(){
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{id: string}>().id;
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

fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${id}`, 
    {method: 'PUT', headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(article)})
    .then((res) => {
        router.push('/show-article/${id}');
    })
    .catch((err) => {
        console.log("Error ffrom AddArticleInfo: " + err);
    });

//placeholder only will change
return( 
    <div className='UpdateArticleInfo'>
        <div className='container'>
            <div className='row'>
                <div
                className='col-md-8 m-auto'>
                    <br />
                    <Link href='/' className='btn btn-outline-warning float-left'>
                    Show Article List
                    </Link>
                    );
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Edit Article</h1> <p 
                        className='lead text-center'>Update Article Info</p>
                        </div>
                        </div>
                        <div className='col-md-8 m-auto'>
                            <form noValidate onSubmit={onSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input type='text'
                                    placeholder='Title of the Book'
                                    name='title'
                                    className='form-control'
                                    value={article.title}
                                    onChange={inputOnChange}/>
                                    </div>
                                    <br />
                                    <div className='form-group'>
                                        <label htmlFor='sources'>Sources</label>
                                        <input
                                        type='text'
                                        placeholder='Sources'
                                        name='sources'
                                        className='form-control'
                                        value={article.sources}
                                        onChange={inputOnChange}
                                        />
                                        </div>
                                        <br />
                                        <div
                                        className='form-group'>
                                            <label
                                            htmlFor='authors'>Author</label>
                                            <input
                                            type='text'
                                            placeholder='Authors'
                                            name='authors'
                                            className='form-control'
                                            value={article.authors}
                                            onChange={inputOnChange}/>
                                            </div>
                                            <br />
                                            <div className='form-group'>
                                                <label
                                                htmlFor='description'>Publication Year</label>
                                                <textarea placeholder='Publication Year'
                                                name='pubyear'
                                                className='form-control'
                                                value={article.pubyear}
                                                onChange={textAreaOnChange}/>
                                                </div>
                                                <br />
                                                <div className='form-group'>
                                                    <label
                                                    htmlFor='email'>Email</label>
                                                    <input type='text'
                                                    placeholder='Published Date'
                                                    name='email'
                                                    className='form-control'
                                                    value={article.email}
                                                    onChange={inputOnChange}/>
                                                    </div>
                                                    <br />
                                                    <div
                                                    className='form-group'>
                                                        <label
                                                        htmlFor='doi'>DOI</label>
                                                        <input
                                                        type='text'
                                                        placeholder='DOI'
                                                        name='doi'
                                                        className='form-control'
                                                        value={article.doi}
                                                        onChange={inputOnChange}/>
                                                        </div>
                                                        <br />
                                                        <button
                                                        type='submit' 
                                                        className='btn btn-outline-info btn-lg btn-block'>
                                                            Update Article
                                                        </button>
                            </form>
                        </div>
                </div>
         </div>
    );

}
export default AddArticleInfo;