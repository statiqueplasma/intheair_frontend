import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, Children } from "react";

function ProjectRoute({ children, ...rest }) {
    const { user } = useAuth();
    const [projects, setProjects] = useState(null);

    useEffect(() => {
		// fetchUserProjects(user).then((data) => {
		// 	setProjects(data)});
	}, [])
    //* Renvoie une liste de id [1, 245, 15, 167, ...] de l'user

    console.log(Children.count(children));
    
    //if the user is logged in we give him access to the page he is trying to access, else we redirect him to the login page
    //!return id in projects ? <Outlet /> : <Navigate to="/projects" />;
};

export default ProjectRoute;
