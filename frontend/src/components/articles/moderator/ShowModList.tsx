import { useEffect, useState } from 'react';
import { Article } from '../Article';
import ModArticleCard from './ModArticleCard';

function ShowModList() {
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
            console.log('Error from ShowModList' + err)
        });
    },[]);

    const articleList =
    articles.length === 0
        ? 'There is no article record'
        :articles.map((articles,k) => <ModArticleCard article={articles} key={k}/>);


    return (
        <div className='ShowModList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Articles to Moderate</h2>
                        </div>
                        <div className='col-md-11'></div>
                    </div>
                <div className='list'>{articleList}</div>
            </div>
        </div>
    );
}
export default ShowModList;