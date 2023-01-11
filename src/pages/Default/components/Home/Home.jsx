import React from "react";
import DefaultPage from "../../DefaultPage";
import BookIcon from "@material-ui/icons/Book";
import AvatarIcon from "@material-ui/icons/Person";
import EmprestimoIcon from "@material-ui/icons/TransferWithinAStation";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    margin: "30px",
    fontSize: "150px",
    cursor: "pointer",
    background: "linear-gradient(to left, #21d4fd, #b721ff)",
    borderRadius: "30px",
    "&:hover": {
      background: "linear-gradient(to right, #21d4fd, #b721ff)",
    },
    padding: "30px",
    color: "#333",
  },
});

function Home() {
  const classes = useStyles();
  return (
    <DefaultPage>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          minHeight: "80vh",
          flexWrap: "wrap",
          padding: "30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/clientes">
            <AvatarIcon className={classes.button}>Clientes</AvatarIcon>
          </Link>
          <Link to="/livros">
            <BookIcon className={classes.button} />
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/emprestimos">
            <EmprestimoIcon className={classes.button} />
          </Link>
          <Link to="/home">
            <HomeIcon className={classes.button} />
          </Link>
        </div>
      </div>
    </DefaultPage>
  );
}

export default Home;
