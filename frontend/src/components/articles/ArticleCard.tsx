import React from 'react';
import { Article } from './Article';
import { useRouter } from 'next/navigation';

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
            <img
            src='https://t4.ftcdn.net/jpg/02/25/08/49/360_F_225084966_hhswkk9GgkAKcr2p1n69aaiI1jETbZO9.jpg'
            alt='Articles'
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