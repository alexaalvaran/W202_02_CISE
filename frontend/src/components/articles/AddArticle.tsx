import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Article, DefaultArticle } from "./Article";

const AddArticleComponent = () => {
    const navigate = useRouter();

    const [article, setArticle] = useState<Article>(DefaultArticle);

    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        setArticle({...article, [event.target.name]: event.target.value});
    };

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(article);
        fetch("http://localhost:2002/api/articles", {method:'POST', headers:{"Content-Type": "application/json"},
        body: JSON.stringify(article)})
        .then((res) => {
            console.log(res);
            setArticle(DefaultArticle);
            navigate.push("/");
        })        
        .catch((err) => {
            console.log('Error from AddArticle' + err);
        });
    };

    return (
        <div className="AddArticle">
            <div className="container">
                <div className="col-md-10 m-auto">
                    <h1 className="display-4 text-center">Add an article</h1>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="form-group">
                            <h3>Title</h3>
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
                            <input
                            type="text"
                            placeholder="Sources of Article"
                            name="sources"
                            className="form-control"
                            value = {article.sources}
                            onChange={onChange}
                            />
                        </div>
                        <br/ >
                        <div className="form-group">
                            <h3>Publication Year</h3>
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
                            <p>(Email of submitter to get notified of status of submitted article)</p>
                            <input
                            type="text"
                            placeholder="example abc@email.com"
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
    )
    
}

export default AddArticleComponent;