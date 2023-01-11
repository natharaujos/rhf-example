import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { getLivro, getClient } from "../../../../services/api";
import DefaultPage from "../../DefaultPage";
import Modal from "../Livro/Modal";

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
  bodyView: {
    background: "#adadad",
    borderRadius: "30px",
    padding: "30px",
  },
  livro: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "column",
  },
});

const ViewLivro = () => {
  const [livro, setLivro] = useState([]);
  const { isbn, titulo, autor, descricao, dataDePublicacao, qtdExemplares } =
    livro;
  const classes = useStyles();
  const { id } = useParams();
  const [client, setClient] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getLivroDetails();
  }, []);

  // const deleteLivroData = async (id) => {
  //   await deleteLivro(id);
  //   getAllLivros();
  // };

  const getLivroDetails = async () => {
    let response = await getLivro(id);
    let client = await getClient();
    setLivro(response.data);
    setClient(client.data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <DefaultPage>
      <div className="form-container">
        <h1 className="form-title">Informações do Livro</h1>
        <div className="livro-details">
          <p className="livro-details-item">Título: {titulo}</p>
          <p className="livro-details-item">Autor: {autor}</p>
          <p className="livro-details-item">Descrição: {descricao}</p>
          <p className="livro-details-item">
            Data de Publicação: {dataDePublicacao}
          </p>
          <p className="livro-details-item">
            Quantidade de Exemplares: {qtdExemplares}
          </p>
        </div>
        <div className="btn-div">
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            className="btn-emp"
            color="#333"
          >
            Realizar Empréstimo
          </Button>
        </div>
        <Modal livro={livro} openAtt={open} handleClose={handleClickClose} />
      </div>
    </DefaultPage>
  );
};

export default ViewLivro;
