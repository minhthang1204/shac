import axios from "axios";
import React from "react";
import Dashboard from "./Dashboard";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Box,
  Container,
  Avatar,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@material-ui/core";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: false,
      isLoginedFail: false,
      isLoading: false,
    };
  }

  _login() {
    this._callAuthAPI(this.state.username, this.state.password);
  }

  _callAuthAPI(username, password) {
    let body = {
      username: username,
      password: password,
    };
    let url = "https://8e6484f74e30.ngrok.io/login";
    let config = {
      method: "POST",
      url: url,
      data: body,
    };
    this.setState({
      isLoading: true,
    });
    axios(config)
      .then((res) => {
        console.log("response:", res.data);
        if (res.data?.status) {
          this.setState({
            isLogin: true,
          });
        } else {
          this.setState({
            isLoginedFail: true,
          });
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }
  //props
  render() {
    if (this.state.isLogin) {
      //hello admin
      return <Dashboard></Dashboard>;
    } else {
      if (this.state.isLoading) {
        return <p>Loading...</p>;
      } else {
        return (
          <Container component="main" maxWidth="xs">
            <Paper
              style={{
                // marginTop: theme.spacing(8),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{
                  // margin: theme.spacing(1),
                  backgroundColor: '#F9E8D5',
                }}
              ></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                style={{
                  width: "100%", // Fix IE 11 issue.
                  // marginTop: theme.spacing(1),
                }}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  // className={{
                  //   margin: theme.spacing(3, 0, 2),
                  // }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            <Box mt={8}></Box>
          </Container>
        );
      }
    }
  }
}
