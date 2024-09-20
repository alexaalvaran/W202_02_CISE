import React from 'react';
import { Article } from './Article';
import { useRouter } from 'next/router';

interface IProp {
    article ?: Article;
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
            <div className='desc'>
                <h2> {article.title} </h2>
                <h3> {article.authors}</h3>
            </div>
        </div>
    )
}
export default ArticleCard;