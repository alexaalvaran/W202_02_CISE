import React, {ChangeEvent,FormEvent,useState} from "react";
import {useRouter} from "next/navigation";
import {Article, DefaultArticle} from "./Article";

const CreateArticleComponent = () => {
    const navigate = useRouter();

    const[article, setArticle] = useState<Article>(DefaultArticle);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle({...article,[event.target.name]:event.target.value});
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(article);
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles', {method: 'POST', headers:{"Content-Type":"application/json"},
            body:JSON.stringify(article)})
        .then((res) => {
            console.log(res);
            setArticle(DefaultArticle);
            navigate.push("/confirmSubmit"); //Pushing to submit
        })
        .catch((err) => {
            console.log('Error from CreateBook: ' + err);
        });
    };

    return(
        <div className="CreateArticle">
            <div className="container">
                <div className="row">
                    <div className="flex-col m-auto">
                        <h1 className="addTitle display-4 text-center ">Add an article</h1>
                        <form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <h3>Title</h3>
                            <p  className="submitInfo">Required</p>
                            <input
                            type="text"
                            placeholder="Title of Article"
                            name="title"
                            className="form-control"
                            value = {article.title}
                            onChange={onChange}
                            />
                        </div>
                        <br/ >
                        <div className="form-group">
                            <h3>Authors</h3>
                            <p  className="submitInfo">Required</p>
                            <input
                            type="text"
                            placeholder="Author(s) of Article"
                            name="authors"
                            className="form-control"
                            value = {article.authors}
                            onChange={onChange}
                            />
                        </div>
                        <br/ >
                        <div className="form-group">
                            <h3>Sources</h3>
                            <p  className="submitInfo">Optional</p>
                            <input
                            type="text"
                            placeholder="Source of Article"
                            name="sources"
                            className="form-control"
                            value = {article.sources}
                            onChange={onChange}
                            />
                        </div>
                        <br/ >
                        <div className="form-group">
                            <h3>Publication Year</h3>
                            <p  className="submitInfo">Required</p>
                            <input
                            type="text"
                            placeholder="Publication Year of Article"
                            name="pubyear"
                            className="form-control"
                            value = {article.pubyear}
                            onChange={onChange}
                            />
                        </div>
                        <br/ >
                        <div className="form-group">
                            <h3>DOI</h3>
                            <p  className="submitInfo">Optional</p>
                            <input
                            type="text"
                            placeholder="DOI of Article"
                            name="doi"
                            className="form-control"
                            value = {article.doi}
                            onChange={onChange}
                            />
                        </div>
                        <br/ >
                        <div className="form-group">
                            <h3>Email</h3>
                            <p className="submitInfo">Email of submitter to get notified of status of submitted article - Optional</p>
                            <input
                            type="text"
                            placeholder="Example: abc@email.com"
                            name="email"
                            className="form-control"
                            value = {article.email}
                            onChange={onChange}
                            />
                        </div>
                        <button
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4 mb-4 w-100 items-center"
                        >
                            Submit article
                        </button>
                        </form>
                       </div>
                  </div>
             </div>
        </div>
    );
};

export default CreateArticleComponent;