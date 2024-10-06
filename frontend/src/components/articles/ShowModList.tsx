import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  
import { Article } from './Article';
import ModArticleCard from './ModArticleCard';

function ShowModList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const router = useRouter();  

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles`)
            .then((res) => res.json())
            .then((articles) => {
                setArticles(articles);
            })
            .catch((err) => {
                console.log('Error from ShowModList' + err);
            });
    }, []);

    const handleCheckDuplicate = () => {
        router.push('/check-duplicates');
    };

    const handleRejectedArticles = () => {
        router.push('/rejected-articles');  
    };

    const articleList =
        articles.length === 0
            ? 'There is no article record'
            : articles.map((article, k) => <ModArticleCard article={article} key={k} />);

    return (
        <div className='ShowModList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Articles to Moderate</h2>

                        
                        <div className='text-center'>
                            <button className='btn btn-outline-primary m-2' onClick={handleCheckDuplicate}>
                                Check Duplicate
                            </button>
                            <button className='btn btn-outline-secondary m-2' onClick={handleRejectedArticles}>
                                Rejected Articles
                            </button>
                        </div>

                        <div className='list'>{articleList}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowModList;
