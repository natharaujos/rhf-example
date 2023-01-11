import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getClient, addEmprestimo } from "../../../../services/api";
import { FormControl, makeStyles, MenuItem } from "@material-ui/core";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Modal = (props) => {
  const [client, setClient] = useState([]);
  const history = useNavigate();
  const schema = yup.object({
    clientes: yup.string().required("*Obrigatório"),
    dataDevolucao: yup.string().required("*Obrigatório"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setEmprestimoLivro(data);
  };

  useEffect(() => {
    getClient().then((res) => {
      setClient(res.data);
      reset(res.data);
    });
  }, [reset]);

  const setEmprestimoLivro = async (data) => {
    let emprestando = {
      nomeCliente: data.clientes,
      livroEmprestado: props.livro.titulo,
    };
    addEmprestimoDetails(emprestando);
  };

  const addEmprestimoDetails = async (e) => {
    await addEmprestimo(e);
    history("/emprestimos");
  };

  return (
    <Dialog open={props.openAtt}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Realizar Empréstimo</DialogTitle>
        <DialogContent>
          <FormControl
            sx={{
              padding: "30px",
            }}
          >
            <TextField
              select
              id="clientes"
              label="Clientes"
              helperText={errors.clientes?.message}
              defaultValue=""
              name="clientes"
              {...register("clientes")}
            >
              {client?.map((c) => (
                <MenuItem key={c.id} value={c.nome}>
                  {c.nome}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              type="date"
              label="Data de Devolução"
              helperText={errors.dataDevolucao?.message}
              name="dataDevolucao"
              variant="standard"
              width="200"
              sx={{
                paddingTop: "20px",
                width: "200px",
              }}
              {...register("dataDevolucao")}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Confirmar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Modal;
