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
        router.push(`/show-articles/${article._id}`)
    };
    return (
        <div className='card-container' onClick={onClick}>
            <img
            src='https://png.pngtree.com/png-vector/20240201/ourlarge/pngtree-aesthetic-book-illustration-png-image_11530249.png'
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