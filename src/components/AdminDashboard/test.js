import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

const Test = () => {
    const { userData, fetchSingleUserData, responsStat } = useData();
    const [loading, setLoading] = useState(true);
    async function logIn(e) {
        // API call with the user creditentials
        let response = await fetch("/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //the request should be as follow
            // {
            //     "email": "the user email",
            //     "password": "the user passwd"
            // }
            body: JSON.stringify({
                email: "tets@gmail.com",
                password: "test123",
            }),
        });
        let data = await response.json().then(() => {
            console.log(response);
            console.log({
                status: response.status,
                error: response.statusText,
            });
        });
        console.log(data);
        // if the response is a success
        if (response.status === 200) {
            console.log({
                status: response.status,
                error: response.statusText,
                message: response.text,
            });
        } else {
            response.json().then((err) => Promise.reject(err));
        }
    }
    useEffect(() => {
        if (loading) {
            logIn(5);
        }
    }, [responsStat, loading]);
    return <div></div>;
};

export default Test;
