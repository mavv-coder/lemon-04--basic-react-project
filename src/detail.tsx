import React from "react";
import { Link, useParams } from "react-router-dom";
import { MemberDetailEntity } from "./models/models";

// Material UI ~ imports
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

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
      <Typography variant="h2" className={classes.h2}>
        User detail
      </Typography>
      <div className={classes.flexContainer}>
        <Avatar src={member.avatar_url} className={classes.avatar} />
        <div className={classes.infoContainer}>
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
      <Link to="/list" className={classes.link}>
        <Button variant="contained" className={classes.btn}>
          Back to list page
        </Button>
      </Link>
    </Container>
  );
};

// Material UI ~ styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    maxWidth: 500,
    paddingTop: "100px",
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
    padding: "10px",
    alignItems: "center",
  },
  h2: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "40px",
  },
  avatar: {
    width: "6rem",
    height: "6rem",
    border: "0.1rem solid #525252",
  },
  infoContainer: {
    marginLeft: "30px",
    textAlign: "left",
  },
  highlightText: {
    borderBottom: "1px solid #2BB686",
  },
  btn: {
    marginTop: "20px",
    color: "white",
    backgroundColor: "#2BB686",
  },
  link: {
    textDecoration: "none",
    color: " white",
  },
}));
