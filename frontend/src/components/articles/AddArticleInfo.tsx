import React, {useState, useEffect, ChangeEvent, FormEvent, ChangeEventHandler} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultArticle } from './Article';
import Link from 'next/link';

function AddArticleInfo(){
    const [article, setArticle] = useState<Article>(DefaultArticle);
    const id = useParams<{id: string}>().id;
    const router = useRouter();

    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_BACKEND + 'api/articles/${id}')
        .then((res)=>{
            return res.json();
        })
        .then((json)=> {
            setArticle(json);
        })
        .catch((err) => {
            console.log('Error from AddArticleInfo' + err);
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

fetch(process.env.NEXT_PUBLIC_BACKEND + 'api/articles/${id}', 
    {method: 'PUT', headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(article)})
    .then((res) => {
        router.push('/show-article/${id}');
    })
    .catch((err) => {
        console.log("Error ffrom AddArticleInfo: " + err);
    });


return( 
    <div className='UpdateBookInfo'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <br />
                    <Link
                    href='/' className='btn btn-outline-warning float-left'>
                        Show Article List
                    </Link>
                </div>
                <div className='col-md-8 m-auto'>
                    <h1 className='display-4 text-center'>Edit Article</h1>
                    <p className='lead text-center'>Update Article Info</p>
                </div>
            </div>
        </div>
    </div>

    );
}
export default AddArticleInfo;