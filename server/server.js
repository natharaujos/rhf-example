const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Cria um token a partir do payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verifica o token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function isAuthenticated({ email, password }) {
  return (
    userdb.usuarios.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Checa se o usuários existe na base de dados
server.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get os dados atuais do usuários
    var data = JSON.parse(data.toString());

    // Get id do último usuário
    var last_item_id = data.users[data.users.length - 1].id;

    // adiciona um novo usuário
    data.users.push({ id: last_item_id + 1, email: email, password: password }); // adiciona alguns dados
    fs.writeFile("./users.json", JSON.stringify(data), (err, _result) => {
      // WRITE
      if (err) {
        const status = 401;
        res.status(status).json({ status, err });
      }
    });
  });

  // Cria o token para o novo usuário
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

// Realiza o Login para alguns usuários from ./users.json
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ email, password, access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
