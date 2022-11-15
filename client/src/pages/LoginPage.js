import React, { useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, postData } from "../service/index";
import Navbar from "../components/Navbar";


export default function LoginPage() {
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "admin@gmail.com",
    password: "12345678",
  });

  const login = async () => {
    let res = await postData("/user/login", inputs);
    if (res.success == false) {
      toast.error(res.message);
      return;
    }
    window.localStorage.setItem("token", res.token);
    const claimUser = await getData("/user/claim-user");
    claimUser?.authUser.type == 1
      ? navigate("/admin-home/", {
          // state: { a: "Hello", b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] },
        })
      : navigate("/member-home/");
  };
  return (
    <>
    <Navbar />
    <div className="vh-100 d-flex align-items-center">
      <Container maxWidth="sm" className="p-5 border border-2 rounded-4">
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
            onChange={(e) => {
              setInputs({ ...inputs, email: e.target.value });
            }}
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
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value });
            }}
          />
          <Button variant="contained" size="large" onClick={login}>
            Login
          </Button>
        </FormControl>
      </Container>
    </div>
    </>
  );
}
