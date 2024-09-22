import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { Article } from './Article';

function ShowArticleList() {
    const [articles, setArticles] = useState<[Article?]>([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles`)
        .then((res) => {
            return res.json();
        })
        .then((articles) =>{
            setArticles(articles);
        })
        .catch((err) =>{
            console.log('Error from ShowArticleList' + err)
        });
    },[]); 

    const articleList =
    articles.length === 0
        ? 'There is no article record'
        :articles.map((articles,k) => <ArticleCard article={articles} key={k}/>);


return(
    <div className='ShowArticleList'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <br />
                    <h2
                    className='display-4 text-center'>List of Articles</h2>
                    </div>
                    <div className='col-md-11'>
                    </div>
                </div>

            <div className='list'>{articleList}</div>
        </div>
    </div>
    );
}
export default ShowArticleList;
