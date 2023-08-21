import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useApi from "../../hooks/useApi";
import { UserContext } from "../../contexts/UserContext";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = useApi();
  const { setUserInfo } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const data = await api.fetchData("user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(data);

      if (data.isSuccesful) {
        setUserInfo({
          token: data.token,
          userInfo: data.currentUser,
          isLoggedin: true,
        });

        navigate("/dashboard");
        return;
      }
    } catch (error) {
      // Handle error
      console.error("Error during login:", error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        id='loginContainer'
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20vh",
          padding: "50px",
          borderRadius: "20px",
        }}>
        <Typography
          variant='h5'
          style={{ fontWeight: "bold" }}
          component='span'>
          Inicio de Sesión
        </Typography>
        <TextField
          id='email'
          label='Correo'
          type='email'
          variant='outlined'
          margin='normal'
          fullWidth
          required
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          InputProps={{
            sx: { borderRadius: "20px" },
          }}
        />
        <TextField
          id='password'
          label='Contraseña'
          type='password'
          variant='outlined'
          margin='normal'
          fullWidth
          required
          defaultValue={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            sx: { borderRadius: "20px" },
          }}
        />
        <Button
          id='signinButton'
          onClick={handleLogin}
          disabled={api.loading}
          variant='contained'
          size='large'
          fullWidth>
          {api.loading ? "Ingresando..." : "Ingresar"}
        </Button>
        {api.error && <div>Se presentó un error: {api.error}</div>}
      </Box>
    </Container>
  );
};

export default Login;
