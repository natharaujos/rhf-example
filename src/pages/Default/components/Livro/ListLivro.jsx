import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { getLivro, deleteLivro } from "../../../../services/api";
import { Link } from "react-router-dom";
import DefaultPage from "../../DefaultPage";
import PlusIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/RemoveRedEyeOutlined";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#333",
      color: "#adadad",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
  addIcon: {
    position: "relative",
    right: "-60px",
    cursor: "pointer",
    background: "linear-gradient(to left, #21d4fd, #b721ff);",
    borderRadius: "30px",
    color: "#333",
    fontSize: "40px",
    "&:hover": {
      background: "linear-gradient(to right, #21d4fd, #b721ff);",
    },
  },
  button: {
    background: "linear-gradient(to left, #21d4fd, #b721ff);",
    color: "#333",
    fontWeight: "bolder",
    "&:hover": {
      background: "linear-gradient(to right, #21d4fd, #b721ff);",
    },
    marginLeft: "10px",
    borderRadius: "30px",
    padding: "5px",
  },
});

const ListLivro = () => {
  const [livros, setLivro] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllLivros();
  }, []);

  const deleteLivroData = async (id) => {
    await deleteLivro(id);
    getAllLivros();
  };

  const getAllLivros = async () => {
    let response = await getLivro();
    setLivro(response.data);
  };

  return (
    <DefaultPage>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Isbn</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Descricao</TableCell>
            <TableCell>Exemplares</TableCell>
            <TableCell>
              <Link to="/livros/add">
                <PlusIcon className={classes.addIcon} />
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {livros.map((livro) => (
            <TableRow className={classes.row} key={livro.id}>
              <TableCell>{livro.isbn}</TableCell>
              <TableCell>{livro.titulo}</TableCell>
              <TableCell>{livro.autor}</TableCell>
              <TableCell>{livro.descricao}</TableCell>
              <TableCell>{livro.qtdExemplares}</TableCell>
              <TableCell>
                <Link to={`/livros/view/${livro.id}`}>
                  <ViewIcon className={classes.button} />
                </Link>
                <Link to={`/livros/edit/${livro.id}`}>
                  <EditIcon className={classes.button} />
                </Link>
                <DeleteIcon
                  className={classes.button}
                  onClick={() => deleteLivroData(livro.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultPage>
  );
};

export default ListLivro;
