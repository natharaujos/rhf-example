import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import { getClient, deleteClient } from "../../../../services/api";
import { Link } from "react-router-dom";
import DefaultPage from "../../DefaultPage";
import PlusIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const ListClient = () => {
  const [clients, setClient] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllClients();
  }, []);

  const deleteClientData = async (id) => {
    await deleteClient(id);
    getAllClients();
  };

  const getAllClients = async () => {
    let response = await getClient();
    setClient(response.data);
  };

  return (
    <DefaultPage>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>
              <Link to="/clientes/add">
                <PlusIcon className={classes.addIcon} />
              </Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow className={classes.row} key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.nome}</TableCell>
              <TableCell>{client.endereco}</TableCell>
              <TableCell>{client.telefone}</TableCell>
              <TableCell>
                <Link to={`/clientes/edit/${client.id}`}>
                  <EditIcon className={classes.button} />
                </Link>
                <DeleteIcon
                  className={classes.button}
                  onClick={() => deleteClientData(client.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultPage>
  );
};

export default ListClient;
