// React ~ imports
import React from "react";
import { Link, generatePath } from "react-router-dom";
import { MemberEntity } from "./models/models";

// Material UI ~ imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Material UI ~ styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    textAlign: "center",
    table: {
      minWidth: 500,
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

// Material UI ~ custom styles
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        background: "white",
        border: "1px solid #ccc",
        height: 40,
        padding: "0 20px",
      },
    },
  },
});

// ListPage component
export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [totalMembers, setTotalMembers] = React.useState<number>(0);
  const [organisation, setOrganisation] = React.useState<string>("lemoncode");
  const [search, setSearch] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(4);
  const classes = useStyles();

  const handlePagination = (page: number): void => {
    setCurrentPage(page);
    fetch(
      `https://api.github.com/orgs/${organisation}/members?per_page=${resultsPerPage}&page=${page}`
    )
      .then((response) => response.json())
      .then((json) => setMembers(json));
  };

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${organisation}/members`)
      .then((response) => response.json())
      .then((json) => setTotalMembers(json.length))
      .then(() => {
        handlePagination(1);
      });
  }, [search]);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <TextField
        id="standard-search"
        type="search"
        variant="outlined"
        size="small"
        value={organisation}
        onChange={(e) => setOrganisation(e.target.value)}
      />
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => {
            setSearch(!search);
          }}
        >
          Search
        </Button>
      </ThemeProvider>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar
                    src={member.avatar_url}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      border: "0.1rem solid #525252",
                    }}
                  />
                </TableCell>
                <TableCell>{member.id}</TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none", color: "#2BB686" }}
                    to={generatePath("/detail/:id", { id: member.login })}
                  >
                    {member.login}
                  </Link>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" style={{ marginTop: "16px" }}>
        <span>
          {`Items per page: ${resultsPerPage} | Page ${currentPage} of ${Math.ceil(
            totalMembers / resultsPerPage
          )}`}
        </span>
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          if (currentPage > 1) {
            handlePagination(currentPage - 1);
          }
        }}
      >
        Last
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          if (currentPage < Math.ceil(totalMembers / resultsPerPage)) {
            handlePagination(currentPage + 1);
          }
        }}
      >
        Next
      </Button>
    </Container>
  );
};
