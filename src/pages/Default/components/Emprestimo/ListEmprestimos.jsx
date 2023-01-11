import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  makeStyles,
} from "@material-ui/core";
import { deleteEmprestimo, getEmprestimo } from "../../../../services/api";
import DefaultPage from "../../DefaultPage";

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
    right: "-110px",
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
    borderRadius: "30px",
    padding: "5px",
  },
});

const ListEmprestimos = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllEmprestimos();
  }, []);

  const cancelEmprestimo = async (id) => {
    await deleteEmprestimo(id);
    getAllEmprestimos();
  };

  const getAllEmprestimos = async () => {
    let response = await getEmprestimo();
    setEmprestimos(response.data);
  };

  return (
    <DefaultPage>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Cliente</TableCell>
            <TableCell>Livro</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emprestimos.map((e) => (
            <TableRow className={classes.row} key={e.id}>
              <TableCell>{e.nomeCliente}</TableCell>
              <TableCell>{e.livroEmprestado}</TableCell>
              <TableCell>
                <Button
                  onClick={() => cancelEmprestimo(e.id)}
                  className={classes.button}
                >
                  Devolver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultPage>
  );
};

export default ListEmprestimos;
