import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getClient, editClient } from "../../../../services/api";
import DefaultPage from "../../DefaultPage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialValue = {
  name: "",
  endereco: "",
  phone: "",
};

const EditClient = (_props) => {
  const [client, setClient] = useState(initialValue);
  const { id } = useParams();
  let history = useNavigate();
  const schema = yup.object({
    nome: yup
      .string()
      .required("*Obrigatório")
      .max(10, "Número máximo de 10 caracteres excedido"),
    endereco: yup
      .string()
      .required("*Obrigatório")
      .max(15, "Número máximo de 15 caracteres excedido"),
    telefone: yup
      .string()
      .required("*Obrigatório")
      .max(15, "O campo deve conter um telefone válido"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: client,
  });

  const onSubmit = (data) => {
    editClientDetails(data);
  };

  useEffect(() => {
    getClient(id).then((res) => {
      setClient(res.data);
      reset(res.data);
    });
  }, [reset]);

  const editClientDetails = async (data) => {
    await editClient(id, data);
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
          <h1 className="form-title">Edit Client</h1>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Nome <span className="invalid">{errors.nome?.message}</span>
            </InputLabel>
            <Input
              name="nome"
              id="my-input"
              aria-describedby="my-helper-text"
              {...register("nome")}
              className={errors.nome ? "is-invalid" : "form-input"}
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
              aria-describedby="my-helper-text"
              {...register("endereco")}
              className={errors.endereco ? "is-invalid" : "form-input"}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Phone <span className="invalid">{errors.telefone?.message}</span>
            </InputLabel>
            <Input
              name="telefone"
              id="my-input"
              aria-describedby="my-helper-text"
              {...register("telefone")}
              className={errors.telefone ? "is-invalid" : "form-input"}
            />
          </FormControl>
          <div className="btn-div">
            <Button
              variant="contained"
              color="primary"
              className="btn-submit"
              type="submit"
            >
              Edit Client
            </Button>
          </div>
        </FormGroup>
      </form>
    </DefaultPage>
  );
};

export default EditClient;
