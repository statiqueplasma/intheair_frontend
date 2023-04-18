import { func } from "prop-types";
import { async } from "q";
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
const DataContext = createContext();

const defaultUsers = [
    {
        id: 1,
        last_login: null,
        last_edit_date: "2023-04-11T15:41:52Z",
        email: "haitam@gmail.com",
        username: "haitam",
        first_name: "haitam",
        last_name: "",
        telephone_number: "",
        hubspot_user_id: "",
        position: "",
        linkedin_url: "",
        company: null,
        user_type: "AG_MISS",
        is_superuser: false,
        is_staff: true,
    },
];

export function useData() {
    return useContext(DataContext);
}

const DataProvider = ({ children }) => {
    const [usersData, setUsersData] = useState(defaultUsers);
    const [userData, setUserData] = useState();
    const [responsStat, setResponseStat] = useState();
    const [companiesData, setCompaniesData] = useState();
    const [companyData, setCompanyData] = useState();
    const [sectorsData, setSectorsData] = useState();
    const [sectorData, setSectorData] = useState();
    const [projectsData, setProjectsData] = useState();
    const [projectData, setProjectData] = useState();
    const [projecttypesData, setProjecttypesData] = useState();
    const [projecttypeData, setProjecttypeData] = useState();
    let navigate = useNavigate();
    const userTypes = [
        {
            value: "AG_DATA",
            label: "Agent Data",
        },
        {
            value: "AG_MISS",
            label: "Agent Mission",
        },
        {
            value: "CLIENT",
            label: "Client",
        },
    ];
    let statusCode = "";
    let error = "";
    let success = "";
    let data = {};
    let buff = "";
    //============= FETCH USER DATA ================================
    async function fetchUsersData() {
        // API call with the user creditentials
        let response = await fetch("/api/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setUsersData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Users Loaded Successfully" : buff,
            });
        });
    }

    async function fetchSingleUserData(id) {
        // API call with the user creditentials
        let response = await fetch(`/api/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setUserData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "User Fetched Successfully" : buff,
            });
        });
    }
    async function updateUser({ values, id }) {
        // API call with the user creditentials
        let response = await fetch(`/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                username: values.username,
                first_name: values.first_name,
                last_name: values.last_name,
                telephone_number: values.telephone_number,
                hubspot_user_id: values.hubspot_user_id,
                position: values.position,
                company: values.company,
                linkedin_url: values.linkedin_url,
                user_type: values.user_type,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setUserData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "User Updated Successfully" : buff,
            });
        });
    }

    async function createUser(values) {
        // API call with the user creditentials
        let response = await fetch(`/api/user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                username: values.username,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
                telephone_number: values.telephone_number,
                hubspot_user_id: values.hubspot_user_id,
                position: values.position,
                company: values.company,
                linkedin_url: values.linkedin_url,
                user_type: values.user_type,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setUserData(data);
                navigate(`/admin/user/${data.id}`);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "User Created Successfully" : buff,
            });
        });
    }

    async function deleteUserData(id) {
        let response = await fetch(`/api/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                setResponseStat({
                    status: "201",
                    error: null,
                    keep: "yes",
                    message: "User Deleted Successfully",
                });
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
                setResponseStat({
                    status: statusCode,
                    error: error,
                    keep: "yes",
                    message: buff,
                });
            }
        });
    }
    //============= FETCH Companies DATA ================================
    async function fetchCompaniesData() {
        let response = await fetch("/api/company/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setCompaniesData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Companies Loaded Successfully" : buff,
            });
        });
    }

    async function fetchSingleCompanyData(id) {
        let response = await fetch(`/api/company/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setCompanyData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Company Fetched Successfully" : buff,
            });
        });
    }

    async function createCompany(values) {
        // API call with the user creditentials
        let response = await fetch(`/api/company/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                description: values.description,
                hubspot_proj_id: values.hubspot_proj_id,
                proj_type: values.proj_type,
                user: values.user,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setCompanyData(data);
                navigate(`/admin/company/${data.id}`);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "Company Created Successfully" : buff,
            });
        });
    }

    async function updateCompany({ values, id }) {
        // API call with the user creditentials
        let response = await fetch(`/api/company/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                description: values.description,
                hubspot_proj_id: values.hubspot_proj_id,
                proj_type: values.proj_type,
                user: values.user,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setCompanyData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "Company Updated Successfully" : buff,
            });
        });
    }
    async function deleteCompanyData(id) {
        let response = await fetch(`/api/company/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                setResponseStat({
                    status: "201",
                    error: null,
                    keep: "yes",
                    message: "Company Deleted Successfully",
                });
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
                setResponseStat({
                    status: statusCode,
                    error: error,
                    keep: "yes",
                    message: buff,
                });
            }
        });
    }
    //============= FETCH Sectors DATA ================================
    async function fetchSectorsData() {
        let response = await fetch("/api/sector/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setSectorsData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Sectors fetched Successfully" : buff,
            });
        });
    }

    async function fetchSingleSectorData(id) {
        let response = await fetch(`/api/sector/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setSectorData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Sector fetched Successfully" : buff,
            });
        });
    }
    async function createSector(values) {
        // API call with the user creditentials
        let response = await fetch(`/api/sector/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: values.label,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setSectorData(data);
                navigate(`/admin/projects/`);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "Sector Created Successfully" : buff,
            });
        });
    }

    async function deleteSectorData(id) {
        let response = await fetch(`/api/sector/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                setResponseStat({
                    status: "201",
                    error: null,
                    keep: "yes",
                    message: "Sector Deleted Successfully",
                });
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
                setResponseStat({
                    status: statusCode,
                    error: error,
                    keep: "yes",
                    message: buff,
                });
            }
        });
    }
    //============= FETCH Project DATA ================================
    async function fetchProjectsData() {
        let response = await fetch("/api/project/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjectsData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Projects Loaded Successfully" : buff,
            });
        });
    }

    async function fetchSingleProjectData(id) {
        let response = await fetch(`/api/project/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjectData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Project Data Loaded Successfully" : buff,
            });
        });
    }
    async function createProject(values) {
        // API call with the user creditentials
        let response = await fetch(`/api/project/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                description: values.description,
                hubspot_proj_id: values.hubspot_proj_id,
                proj_type: values.proj_type,
                user: values.user,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjectData(data);
                navigate(`/admin/project/${data.id}`);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "Projec Created Successfully" : buff,
            });
        });
    }

    async function updateProject({ values, id }) {
        // API call with the user creditentials
        let response = await fetch(`/api/project/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                description: values.description,
                hubspot_proj_id: values.hubspot_proj_id,
                proj_type: values.proj_type,
                user: values.user,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjectData(data);
                navigate(`/admin/project/${data.id}`);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: "yes",
                message: success ? "Project Updated Successfully" : buff,
            });
        });
    }
    async function deleteProjectData(id) {
        let response = await fetch(`/api/project/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                setResponseStat({
                    status: "201",
                    error: null,
                    keep: "yes",
                    message: "Project Deleted Successfully",
                });
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
                setResponseStat({
                    status: statusCode,
                    error: error,
                    keep: "yes",
                    message: buff,
                });
            }
        });
    }

    //============= FETCH Projecttypes DATA ================================
    async function fetchProjecttypesData() {
        let response = await fetch("/api/projecttype/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjecttypesData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Projecttypes Loaded Successfully" : buff,
            });
        });
    }

    async function fetchSingleProjecttypeData(id) {
        let response = await fetch(`/api/projecttype/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjecttypeData(data);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Projecttype Loaded Successfully" : buff,
            });
        });
    }
    async function createProjecttype(values) {
        // API call with the user creditentials
        let response = await fetch(`/api/projecttype/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: values.label,
            }),
        });
        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                data = res;
                setProjecttypeData(data);
                navigate(`/admin/projects/`);
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
            }
            setResponseStat({
                status: statusCode,
                error: error,
                keep: success ? null : "yes",
                message: success ? "Project Type Created Successfully" : buff,
            });
        });
    }

    async function deleteProjecttypeData(id) {
        let response = await fetch(`/api/projecttype/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        statusCode = response.status;
        error = response.statusText;
        success = response.ok;
        data = {};
        buff = "";
        response.json().then((res) => {
            if (success) {
                setResponseStat({
                    status: "201",
                    error: null,
                    keep: "yes",
                    message: "Project Type Deleted Successfully",
                });
            } else {
                for (var key in res) {
                    buff = buff + `${res[key]} `;
                }
                setResponseStat({
                    status: statusCode,
                    error: error,
                    keep: success ? null : "yes",
                    message: buff,
                });
            }
        });
    }
    const contextData = {
        //RESPONSE OBJECT FOR NOTIFS
        responsStat: responsStat,
        // USER DATA
        usersData: usersData,
        userData: userData,
        userTypes: userTypes,
        fetchUsersData: fetchUsersData,
        fetchSingleUserData: fetchSingleUserData,
        updateUser: updateUser,
        createUser: createUser,
        deleteUserData: deleteUserData,
        // COMPANY DATA
        companiesData: companiesData,
        companyData: companyData,
        fetchCompaniesData: fetchCompaniesData,
        fetchSingleCompanyData: fetchSingleCompanyData,
        updateCompany: updateCompany,
        createCompany: createCompany,
        deleteCompanyData: deleteCompanyData,
        // SECTOR DATA
        sectorsData: sectorsData,
        sectorData: sectorData,
        fetchSectorsData: fetchSectorsData,
        fetchSingleSectorData: fetchSingleSectorData,
        createSector: createSector,
        deleteSectorData: deleteSectorData,
        // PROJECT DATA
        projectsData: projectsData,
        projectData: projectData,
        fetchProjectsData: fetchProjectsData,
        fetchSingleProjectData: fetchSingleProjectData,
        updateProject: updateProject,
        createProject: createProject,
        deleteProjectData: deleteProjectData,
        // PROJECTTYPE DATA
        projecttypesData: projecttypesData,
        projecttypeData: projecttypeData,
        fetchProjecttypesData: fetchProjecttypesData,
        fetchSingleProjecttypeData: fetchSingleProjecttypeData,
        createProjecttype: createProjecttype,
        deleteProjecttypeData: deleteProjecttypeData,
    };
    return (
        <DataContext.Provider value={contextData}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
