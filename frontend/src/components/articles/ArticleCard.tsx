/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Article } from './Article';
import { useRouter } from 'next/navigation';

interface IProp {
    article?: Article;
}

const ArticleCard = ({ article }: IProp ) => {
    const router = useRouter();
    if(article == undefined) {
        return null;
    }
    const onClick = () => {
        router.push('/show-article/${article._id}')
    };
    return (
        <div className='card-container' onClick={onClick}>
            <img
            src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
            alt='Books'
            height={200}
            />
            <div className='desc'>
                <h2> {article.title} </h2>
                <h3> {article.authors}</h3>
            </div>
        </div>
    )
}
export default ArticleCard;