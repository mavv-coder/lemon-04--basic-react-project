import React from "react";
import { useHistory } from "react-router-dom";

// Material UI ~ imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

// Material UI ~ styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    height: "100vh",
    paddingTop: "100px",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  label: {
    fontSize: "18px",
    display: "inline-block",
    marginRight: "10px",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}));

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const classes = useStyles();

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "test") {
      history.push("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <form onSubmit={handleNavigation}>
        <Typography
          variant="h2"
          style={{ fontSize: "40px", marginBottom: "20px" }}
        >
          User login
        </Typography>
        <div>
          <div className={classes.flexContainer}>
            <Typography className={classes.label}>Username: </Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes.flexContainer}>
            <Typography className={classes.label}>Password: </Typography>
            <TextField
              id="standard-search"
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#2BB686",
            color: "white",
            marginTop: "20px",
          }}
        >
          login
        </Button>
      </form>
    </Container>
  );
};
