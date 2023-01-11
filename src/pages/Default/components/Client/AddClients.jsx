import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { addClient } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import DefaultPage from "../../DefaultPage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialValue = {
  nome: "",
  endereco: "",
  telefone: "",
};

const AddClients = (_props) => {
  let history = useNavigate();
  const schema = yup.object({
    nome: yup
      .string()
      .required("*Obrigatório")
      .max(15, "O nome deve conter no máximo 15 caracteres"),
    endereco: yup
      .string()
      .required("*Obrigatório")
      .max(30, "O endereço deve conter no máximo 30 caracteres"),
    telefone: yup
      .string()
      .required("*Obrigatório")
      .max(14, "O telefone deve conter uma quantidade válida de caracteres"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addClientDetails(data);
  };

  const addClientDetails = async (data) => {
    await addClient(data);
    history("/clientes");
  };

  return (
    <DefaultPage>
      <form
        className="form-container"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <h1 className="form-title">Adicionar Cliente</h1>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Nome <span className="invalid">{errors.nome?.message}</span>
            </InputLabel>
            <Input
              name="nome"
              id="my-input"
              className={errors.nome ? "is-invalid" : "form-input"}
              {...register("nome")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Endereço{" "}
              <span className="invalid">{errors.endereco?.message}</span>
            </InputLabel>
            <Input
              name="endereco"
              id="my-input"
              className={errors.endereco ? "is-invalid" : "form-input"}
              {...register("endereco")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Telefone{" "}
              <span className="invalid">{errors.telefone?.message}</span>
            </InputLabel>
            <Input
              name="telefone"
              id="my-input"
              className={errors.telefone ? "is-invalid" : "form-input"}
              {...register("telefone")}
            />
          </FormControl>
          <FormControl>
            <Button variant="contained" className="btn-submit" type="submit">
              Adicionar Cliente
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </DefaultPage>
  );
};

export default AddClients;
