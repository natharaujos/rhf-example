import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getLivro, editLivro } from "../../../../services/api";
import DefaultPage from "../../DefaultPage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
    background: "#adadad",
    padding: "30px",
    borderRadius: "30px",
  },
  button: {
    background: "linear-gradient(to left, #21d4fd, #b721ff)",
    color: "#333",
    fontWeight: "bolder",
    "&:hover": {
      background: "linear-gradient(to right, #21d4fd, #b721ff);",
    },
    marginLeft: "10px",
  },
});

const EditLivro = () => {
  const [livro, setLivro] = useState([]);
  const { id } = useParams();
  let history = useNavigate();
  const schema = yup.object({
    titulo: yup.string().required("O título é obrigatório"),
    autor: yup.string().required("O isbn é obrigatório"),
    descricao: yup.string().required("A descriçãoé obrigatória"),
    dataDePublicacao: yup.string().required("O isbn é obrigatório"),
    qtdExemplares: yup.string().required("O isbn é obrigatório"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: livro,
  });

  const onSubmit = (data) => {
    editLivroDetails(data);
  };

  useEffect(() => {
    getLivro(id).then((res) => {
      setLivro(res.data);
      reset(res.data);
    });
  }, [reset]);

  const editLivroDetails = async (data) => {
    await editLivro(id, data);
    history("/livros");
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
          <h1 className="form-title">Edit Livro</h1>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Título <span className="invalid">{errors.titulo?.message}</span>
            </InputLabel>
            <Input
              name="titulo"
              id="my-input"
              aria-describedby="my-helper-text"
              {...register("titulo")}
              className={errors.titulo ? "is-invalid" : "form-input"}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="my-input">
              Autor <span className="invalid">{errors.autor?.message}</span>
            </InputLabel>
            <Input
              name="autor"
              id="my-input"
              aria-describedby="my-helper-text"
              {...register("autor")}
              className={errors.autor ? "is-invalid" : "form-input"}
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
              aria-describedby="my-helper-text"
              {...register("descricao")}
              className={errors.descricao ? "is-invalid" : "form-input"}
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
              aria-describedby="my-helper-text"
              {...register("dataDePublicacao")}
              className={errors.dataDePublicacao ? "is-invalid" : "form-input"}
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
              aria-describedby="my-helper-text"
              {...register("qtdExemplares")}
              className={errors.qtdDeExemplares ? "is-invalid" : "form-input"}
            />
          </FormControl>
          <div className="btn-div">
            <Button
              variant="contained"
              color="primary"
              className="btn-submit"
              type="submit"
            >
              Edit Livro
            </Button>
          </div>
        </FormGroup>
      </form>
    </DefaultPage>
  );
};

export default EditLivro;
