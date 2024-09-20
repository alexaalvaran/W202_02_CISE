import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {User, DefaultUser} from "./User";

const NewUserComponent = () => {
    const navigate = useRouter();

    const[user, setUser] = useState<User>(DefaultUser);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[event.target.name]: event.target.value});
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user);
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/users/`, {method: 'POST', headers: {"Content-Type":"application/json"}, body:JSON.stringify(user)})
        .then((res) => {
            console.log(res);
            setUser(DefaultUser);
            navigate.push("/");
        })
        .catch((err) => {
            console.log('No user' + err);
        });
    };

    return(
        <div className="AuthUser">
            <div className="container">
                <div className="row">
                    <div className="flex-col m-auto">
                        <h1 className="LoginTitle display-4 text-center">Login</h1>
                        <form noValidate onSubmit={onSubmit}>
                            <div className="form-group">
                                <h3>Email</h3>
                                <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                className="form-control"
                                value={user.email}
                                onChange={onChange}
                                required
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <h3>password</h3>
                                <input
                                type="text"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                                value={user.password}
                                onChange= {onChange}
                                required
                                />
                            </div>
                            <button
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4 mb-4 w-100 items-center"
                        >
                            Login
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUserComponent;