import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import "./Header.css";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logOut = () => {
    setUserInfo({
      token: null,
      userInfo: null,
      isLoggedin: false,
    });
  };

  return (
    <>
      <AppBar id='main-header' position='static'>
        <Toolbar>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}>
            <Link to={"dashboard"} style={{ textDecoration: "none" }}>
              <AutoStoriesIcon
                fontSize='large'
                className='logoIcon'
                style={{ marginRight: "10px", height: "40px" }}
              />
            </Link>
            <Link to={"dashboard"} style={{ textDecoration: "none" }}>
              <Typography variant='h6' component='span' className='appTitle'>
                Daily
              </Typography>
              <Typography
                variant='h6'
                component='span'
                className='appTitleSufix'>
                gram
              </Typography>
            </Link>
          </div>
          {!userInfo.isLoggedin ? (
            <div className='buttonsContainer'>
              <Link to={"signin"}>
                <Button id='homeSignin'>Ingresar</Button>
              </Link>
              <Link to={"signup"}>
                <Button id='homeSignUp'>Registrarse</Button>
              </Link>
            </div>
          ) : (
            <div className='buttonsContainerSignin'>
              <Button
                id='welcomeSignin'
                style={{ cursor: "default", marginRight: "15px" }}>
                Bienvenido {userInfo.userInfo.name}
              </Button>
              <Button
                id='logOutSignUp'
                style={{ textTransform: "capitalize" }}
                onClick={logOut}>
                Cerrar Sesión
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
