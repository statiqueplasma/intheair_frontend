import React, { useState } from 'react';
import { FaRegChartBar }from "react-icons/fa";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { tokens } from "./../../../../theme";
import { Box, IconButton, useTheme, Divider } from "@mui/material";

const ProjectBar = ({projectItem}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const color = theme.palette.mode === "light"
    ? colors.indigo[600]
    : colors.turquoise[600];
    const separatorStyle =
        theme.palette.mode === "light"
            ? colors.black[400]
            : colors.white[100];
    console.log("project = ", projectItem)
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "70px"}} className="projectbar">
               <div className="top_section">
               
               <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="bars" style={{color :separatorStyle}}>
            <KeyboardDoubleArrowLeftIcon className="fleches" onClick={toggle} />
      </div>
      <Typography style={{ display: isOpen ? "block" : "none", margin: "15px 0px 0px 30px"}}
        variant="h4"
        align="center"
        color={separatorStyle}
        marginTop="40px"
      >
        Projets
      </Typography>
    </div>
               </div>
               {projectItem ?( 
                projectItem.map((item, index)=>(
                       <NavLink to={`/dashboard/project/${item.id}`} key={index} className="link" activeclassName="active">
                           <div className="icon" style={{ color: color }}><FaRegChartBar/></div>
                           <div  className="link_text" style={{ display: isOpen ? "block" : "none" ,color: color }}>
                                {item.name}
                            </div>
                       </NavLink>
                   ))) :(<Typography>No Project !</Typography>)}
              
           </div>
           {/* <main>{children}</main> */}
        </div>
    );
};

export default ProjectBar;