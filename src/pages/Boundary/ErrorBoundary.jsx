import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa.
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return <p>Houve um error : {this.state.message}</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
