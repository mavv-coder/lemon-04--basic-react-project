import React from "react";
import { Link, useParams } from "react-router-dom";
import { MemberDetailEntity } from "./models/models";

// Material UI ~ imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// Material UI ~ styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    paddingTop: "100px",
    maxWidth: 500,
    fontFamily: "Roboto",
    textAlign: "center",
    table: {
      minWidth: 500,
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  highlightText: {
    borderBottom: "1px solid #2BB686",
  },
}));

const createDefaultMemberDetail = () => ({
  id: "",
  login: "",
  name: "",
  company: "",
  avatar_url: "",
});

export const DetailPage: React.FC = () => {
  const [member, setMember] = React.useState<MemberDetailEntity>(
    createDefaultMemberDetail()
  );
  const { id } = useParams();
  const classes = useStyles();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <Container className={classes.root}>
      <Typography
        variant="h2"
        style={{ fontSize: "40px", marginBottom: "20px", textAlign: "center" }}
      >
        User detail
      </Typography>
      <div className={classes.flexContainer}>
        <Avatar
          src={member.avatar_url}
          style={{
            width: "6rem",
            height: "6rem",
            border: "0.1rem solid #525252",
          }}
        />
        <div style={{ textAlign: "left", marginLeft: "30px" }}>
          <Typography>
            {" "}
            ID: <span className={classes.highlightText}>{member.id}</span>
          </Typography>
          <Typography>
            {" "}
            Login:{" "}
            <span className={classes.highlightText}> {member.login}</span>
          </Typography>
          <Typography>
            {" "}
            Name: <span className={classes.highlightText}>{member.name}</span>
          </Typography>
          <Typography>
            {" "}
            Company:{" "}
            <span className={classes.highlightText}>{member.company}</span>
          </Typography>
        </div>
      </div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#2BB686",
          color: "white",
          marginTop: "20px",
        }}
      >
        <Link to="/list" style={{ textDecoration: "none", color: " white" }}>
          Back to list page
        </Link>
      </Button>
    </Container>
  );
};
