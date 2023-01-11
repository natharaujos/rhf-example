import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
} from "@material-ui/core";
import { addLivro } from "../../../../services/api";
import { Navigate } from "react-router-dom";
import DefaultPage from "../../DefaultPage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialValue = {
  isbn: "",
  titulo: "",
  autor: "",
  descricao: "",
  dataDePublicacao: "",
  qtdExemplares: "",
  qtdExemplaresLivres: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const AddLivro = () => {
  const [livro, setLivro] = useState(initialValue);
  // let history = useNavigate();
  const schema = yup.object({
    titulo: yup.string().required("*Obrigatório"),
    isbn: yup.string().required("*Obrigatório"),
    autor: yup.string().required("*Obrigatório"),
    descricao: yup.string().required("*Obrigatório"),
    dataDePublicacao: yup.string().required("*Obrigatório"),
    qtdExemplares: yup.string().required("*Obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addLivroDetails(data);
  };

  const addLivroDetails = async (data) => {
    await addLivro(data);
  };

  return (
    <DefaultPage>
      <form
        className="form-container"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h1 className="form-title">Add Livro</h1>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Isbn <span className="invalid">{errors.isbn?.message}</span>
            </InputLabel>
            <Input
              name="isbn"
              id="my-input"
              className={errors.isbn ? "is-invalid" : "form-input"}
              {...register("isbn")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Título <span className="invalid">{errors.titulo?.message}</span>
            </InputLabel>
            <Input
              name="titulo"
              id="my-input"
              className={errors.titulo ? "is-invalid" : "form-input"}
              {...register("titulo")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Autor <span className="invalid">{errors.autor?.message}</span>
            </InputLabel>
            <Input
              name="autor"
              id="my-input"
              className={errors.autor ? "is-invalid" : "form-input"}
              {...register("autor")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Descrição{" "}
              <span className="invalid">{errors.descricao?.message}</span>
            </InputLabel>
            <Input
              name="descricao"
              id="my-input"
              className={errors.descricao ? "is-invalid" : "form-input"}
              {...register("descricao")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Data de Publicação{" "}
              <span className="invalid">
                {errors.dataDePublicacao?.message}
              </span>
            </InputLabel>
            <Input
              name="dataDePublicacao"
              id="my-input"
              className={errors.dataDePublicacao ? "is-invalid" : "form-input"}
              {...register("dataDePublicacao")}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Quantidade de Exemplares{" "}
              <span className="invalid">{errors.qtdExemplares?.message}</span>
            </InputLabel>
            <Input
              name="qtdExemplares"
              id="my-input"
              className={errors.qtdDeExemplares ? "is-invalid" : "form-input"}
              {...register("qtdExemplares")}
              style={{ marginBottom: "10px" }}
              color="#adadad"
            />
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn-submit"
              name="addLivro"
            >
              Add Livro
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </DefaultPage>
  );
};

export default AddLivro;
