import { useEffect, useState } from "react";
import AcceptedArticleCard from "./AcceptedArticleCard";
import { Article } from "./Article";

function AcceptedArticleList() {
    const [articles, setArticles] = useState<[Article?]>([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/acceptArticles`)
        .then((res) => {
            return res.json();
        })
        .then((articles) =>{
            setArticles(articles);
        })
        .catch((err) =>{
            console.log('Error from AcceptedArticleList' + err)
        });
    },[]);

    const acceptedArticleList =
    articles.length === 0
        ? 'There is no article record'
        :articles.map((articles,k) => <AcceptedArticleCard article={articles} key={k}/>);

    return (
        <div className='AcceptedArticleList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Articles to Analyse</h2>
                    </div>
                    <div className='col-md-11'></div>
                </div>
                <div className='list'>{acceptedArticleList}</div>
            </div>
        </div>
    );
}

export default AcceptedArticleList;