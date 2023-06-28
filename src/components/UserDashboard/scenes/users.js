import Header from "../global/header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { GridToolbar } from "@mui/x-data-grid";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Table from "../global/table";
import Loading from "../global/loading";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useAuth } from "../../../contexts/AuthContext";
import { useData } from "../../../contexts/DataContext";

import "./users.css"
// import Icon;
import PersonIcon from '@mui/icons-material/PersonOutline';
import MailIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/LockOutlined';
import Pen from '@mui/icons-material/Edit';

import InfoUser from "../global/Modal/InfoUser";
import MailUser from "../global/Modal/MailUser";
import MdpUser from "../global/Modal/MdpUser";

const Users1 = () => {
    let navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const { usersData, fetchUsersData, idtest, idusertest } = useData();
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { user } = useAuth();
    const {userData, fetchSingleUserData} = useData()
    const iconStyle = theme.palette.mode === "light" ? colors.white[500] : colors.black[200];
    useEffect(() => {
        if (loading) {
            fetchSingleUserData(user.user_id);
            setLoading(false);
        }
        if (userData) {
            setDataLoaded(true);
        }
    }, [userData, loading]);


    return (
        <Box minHeight="800px" height="100%">
            {dataLoaded ? (
                <Box display="flex" flexDirection="column">
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="10px"
                        mt="5px"
                    >
                        <Header
                            icon={<SupervisorAccountIcon fontSize="inherit" />}
                            title="Données personnelles"
                            subtitle="Voir et mettre à jour vos informations ici. Gérez vos identifiants et mots de passe ici."
                        />
                        
                        
                    </Box>

                    {
                    
                        <div>
                            <div className='infoClient' >
                                <div className="iconUserPage">
                                    <PersonIcon style={{ fontSize: '60' }} />                             
                                </div>
                                <div className="infosection">
                                    <div>
                                        <h5>Prénom</h5>
                                        <p> {userData.first_name}</p>
                                    </div>

                                    <div>
                                        <h5>Nom</h5>
                                        <p> {userData.last_name}</p>
                                    </div>

                                    <div>
                                        <h5>Téléphone mobile</h5>
                                        <p>{userData.telephone_number}</p>
                                    </div>

                                    <div>
                                        <h5>Company</h5>
                                        <p>{userData.company}</p>
                                    </div>

                                    <div>
                                        <h5>Adresse</h5>
                                        <p> {userData.position}</p>
                                    </div>

                                    <div>
                                        <h5>Linkedin</h5>
                                        <p>{userData.linkedin_url}</p>
                                    </div>
                                                                        
                                </div>

                                <InfoUser />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <hr style={{ width: '80%', height: '2px', backgroundColor: colors.black["400"] }} />
                        </div>


                   
                        <div className='mailSection'>

                            <div className="iconMail">
                                <MailIcon style={{ fontSize: '55' }} />                             
                            </div>

                            <div className="mailsection">
                                <div>
                                    <h5>Votre adresse e-mail</h5>
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                            
                            <MailUser />
                                    
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <hr style={{ width: '80%', height: '2px', backgroundColor: colors.black["400"], }} />
                        </div>

                        
                        <div className='mailSection'>

                            <div className="iconMail">
                                <LockIcon style={{ fontSize: '60' }} />                             
                            </div>

                            <div className="mailsection">
                                <div>
                                    <h5>Votre mot de passe</h5>
                                    <p>***************</p>
                                </div>
                            </div>
                            
                            <MdpUser />
                                    
                        </div>
                        </div>
                    }
                
             
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <hr style={{ width: '80%', height: '2px', backgroundColor: colors.black["400"], }} />
                    </div>
                    


                    
                </Box>
            ) : (
                <Loading />
            )}
            

            
        </Box>
        
    );
};

export default Users1;
