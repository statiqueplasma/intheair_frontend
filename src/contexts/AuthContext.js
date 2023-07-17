import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    //check if there are data in the local storage and init the user and token variable with them
    let authTokenBuffer = localStorage.getItem("authToken")
        ? JSON.parse(localStorage.getItem("authToken"))
        : null;
    let authUserBuffer = localStorage.getItem("authToken")
        ? jwt_decode(localStorage.getItem("authToken"))
        : null;
    const [user, setUser] = useState(() => authUserBuffer);
    const [authTokens, setAuthTokens] = useState(() => authTokenBuffer);
    // the login function
    async function logIn(e) {
        e.preventDefault();
        e.stopPropagation();
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
                email: e.target.email.value,
                password: e.target.mdp.value,
            }),
        });
        let data = await response.json();
        // if the response is a success
        if (response.status === 200) {
            //update the access and refresh token with the data retrieved
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authToken", JSON.stringify(data));
            localStorage.setItem(
                "user",
                JSON.stringify(jwt_decode(data.access))
            );
            navigate("/userroute");
        }
    }

    // the Logout function
    let logOut = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // update the local access token using the refresh token periodically
    let updateToken = async () => {
        // API call
        let iterator = 0;
        let response = await fetch("/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //the request should be as follow
            // {
            //     "refresh": "the refresh token"
            // }
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });
        let data = await response.json();
        if (response.status === 200) {
            //update the local tokens with the new ones
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authToken", JSON.stringify(data));
            localStorage.setItem(
                "user",
                JSON.stringify(jwt_decode(data.access))
            );
        } else {
            //if the api call fails the user is logged out
            if (iterator > 5) logOut();
            else iterator++;
        }
    };

    // Contact
    async function sendDevis(values) {
        // API call with the user creditentials
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("last_name", values.last_name);
        formData.append("first_name", values.first_name);
        formData.append("description", values.description);
        formData.append("rendu", values.rendu);
        formData.append("specification_file", values.specification_file);
        formData.append("comments", values.comments);
        formData.append("kml_file", values.kml_file);
        let response = await fetch(`/api/contact/devis/`, {
            method: "POST",
            body: formData,
        });
        // statusCode = response.status;
        // error = response.statusText;
        // success = response.ok;
        // data = {};
        // buff = "";
        response.json().then((res) => {
            // if (success) {
            //     data = res;
            // } else {
            //     for (var key in res) {
            //         buff = buff + `${res[key]} `;
            //     }
            // }
        });
    }

    useEffect(() => {
        if (loading) {
            //update the token when the page is loaded
            if (authTokens) {
                updateToken();
            }
            setLoading(false);
        }
        const intervalTime = 1000 * 60 * 4; //update interval set to 4 mins
        let interval_id = setInterval(() => {
            //update the token if exists
            if (authTokens) {
                updateToken();
            }
        }, intervalTime);

        //clear the interval instance
        return () => clearInterval(interval_id);
    }, [authTokens, loading]);

    //the context data passed to the children
    const contextData = {
        //currentUser,
        user: user, // to set to use after testing is done
        authTokens: authTokens,
        logIn: logIn,
        logOut: logOut,
        updateToken: updateToken,
        sendDevis: sendDevis,
    };

    // redering the component
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
