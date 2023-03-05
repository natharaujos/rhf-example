# rhf-example
  <p>
    Este projeto é um exemplo de como utilizar a biblioteca React Hook Form para
    lidar com formulários em uma aplicação React. O objetivo deste projeto é
    demonstrar como utilizar os principais recursos do React Hook Form, como
    criar campos de formulário, validar entradas e manipular eventos de
    formulário.
  </p>
  <h2>Tecnologias utilizadas</h2>
  <ul>
    <li>React</li>
    <li>React Hook Form</li>
    <li>Yup</li>
  </ul>
  <h2>Funcionalidades</h2>
  <ul>
    <li>
      Criação de um formulário com campos de entrada de texto, seleção e caixas
      de seleção.
    </li>
    <li>Validação de entrada de formulário usando a biblioteca Yup.</li>
    <li>
      Manipulação de eventos de formulário usando os hooks disponíveis no React
      Hook Form.
    </li>
  </ul>
  <h2>Como rodar o projeto</h2>
  <p>Para rodar o projeto localmente, siga os seguintes passos:</p>
  <ol>
    <li>Clone este repositório para o seu computador.</li>
    <li>Abra o terminal e navegue até a pasta do projeto.</li>
    <li>Digite <code>npm install</code> para instalar as dependências.</li>
    <li>
      Digite <code>npm start</code> para iniciar o servidor de desenvolvimento.
    </li>
    <li>Abra o navegador e acesse <code>http://localhost:3000</code>.</li>
  </ol>
  <h2>Como utilizar o React Hook Form</h2>
  <p>
    O React Hook Form é uma biblioteca de gerenciamento de formulários para
    React que utiliza hooks para manipular eventos de formulário. Para utilizar
    o React Hook Form em sua aplicação React, você precisa seguir os seguintes
    passos:
  </p>
  <ol>
    <li>
      Instale a biblioteca React Hook Form utilizando o comando
      <code>npm install react-hook-form</code>.
    </li>
    <li>
      Importe o hook <code>useForm</code> do React Hook Form em seu componente
      React.
    </li>
    <li>
      Utilize o hook <code>useForm</code> para criar um objeto de configuração
      para o formulário, passando as opções de validação, registro de campos e
      manipulação de eventos de formulário.
    </li>
    <li>
      Adicione campos de formulário à sua página usando os componentes
      fornecidos pelo React Hook Form, como <code>Controller</code> para campos
      de entrada de texto, <code>Select</code> para campos de seleção e
      <code>Checkbox</code> para caixas de seleção.
    </li>
    <li>
      Use as funções de validação do Yup para validar a entrada de formulário
      antes de enviar os dados para o backend.
    </li>
    <li>
      Use os métodos <code>handleSubmit</code>, <code>reset</code> e
      <code>setError</code> do objeto de configuração do formulário para
      manipular eventos de formulário, como envio de dados, reinicialização de
      campos e exibição de mensagens de erro.
    </li>
  </ol>
