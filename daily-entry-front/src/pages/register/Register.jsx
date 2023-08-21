import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useApi from "../../hooks/useApi";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = useApi();

  const handleRegister = async () => {
    try {
      const data = await api.fetchData("user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      console.log(data);

      if (data.isSuccesful) {
        navigate("/signin");
        return;
      }
    } catch (error) {
      // Handle error
      console.error("Error during register:", error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        id='registerContainer'
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20vh",
        }}>
        <Typography
          variant='h5'
          style={{ color: "white", fontWeight: "bold" }}
          component='span'>
          Registro
        </Typography>
        <TextField
          id='name'
          label='Nombre'
          color='primary'
          type='name'
          variant='outlined'
          margin='normal'
          fullWidth
          required
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          InputProps={{
            sx: { borderRadius: "20px" },
          }}
          InputLabelProps={{ sx: { color: "white" } }}
        />
        <TextField
          id='emailRegister'
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
          InputLabelProps={{ sx: { color: "white" } }}
        />
        <TextField
          id='passwordRegister'
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
          InputLabelProps={{ sx: { color: "white" } }}
        />
        <Button
          id='registerButton'
          variant='contained'
          size='large'
          fullWidth
          onClick={handleRegister}
          disabled={api.loading}>
          {api.loading ? "Registrando Usuario..." : "Registrarse"}
        </Button>
        {api.error && <div>Se presentó un error: {api.error}</div>}
      </Box>
    </Container>
  );
};

export default Register;
