import React from "react";
import {
  TextField,
  Typography,
  FormControl,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  let navigate = useNavigate();
  const login = () => {
    navigate("/home/5", {
      state: { a: "Hello", b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] },
    });
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" component="h4" style={{ marginBottom: 10 }}>
        Login
      </Typography>

      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          required
          error={false}
          // defaultValue="Hello World"
          helperText="Email is required."
          style={{ marginBottom: 20 }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          required
          error={false}
          // defaultValue="Hello World"
          helperText="Password is required."
          type="password"
          style={{ marginBottom: 20 }}
        />
        <Button variant="contained" size="large" onClick={login}>
          Login
        </Button>
      </FormControl>
    </Container>
  );
}
