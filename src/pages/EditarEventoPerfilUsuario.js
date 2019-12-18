import React, { Component } from 'react';
import Api from '../services/Api';
import '../assets/CSS/EditarEventoPerfilUsuario.css';
import CabecalhoBotao from '../components/CabecalhoBotao';
import Rodape from '../components/Rodape';
import { parseJwt } from '../services/auth';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class EditarEventoPerfilUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      usuarioId: parseJwt().UserId,
      usuarioNome: '',
      evento: '',
      eventoId: '',
      eventoNome: '',
      eventoDescricao: '',
      eventoData: '',
      eventoHorarioComeco: '',
      eventoHorarioFim: '',
      editarModal: {
        evento: '',
        eventoId: '',
        eventoNome: '',
        eventoDescricao: '',
        eventoData: '',
        eventoHorarioComeco: '',
        eventoHorarioFim: '',
      }
    }

    // this.buscarUsuario = this.buscarUsuario.bind(this);
    this.buscarEvento = this.buscarEvento.bind(this);
    this.atualizarEstadoNome = this.atualizarEstadoNome.bind(this);
    this.atualizarEstadoDescricao = this.atualizarEstadoDescricao.bind(this);
    this.atualizarEstadoData = this.atualizarEstadoData.bind(this);
    this.atualizarEstadoHorarioComeco = this.atualizarEstadoHorarioComeco.bind(this);
    this.atualizarEstadoHorarioFim = this.atualizarEstadoHorarioFim.bind(this);
  }

  // buscarUsuario() {
  //   fetch('https://localhost:5001/api/usuariotbl/' + this.state.usuarioId)
  //     .then(resposta => resposta.json())
  //     .then(data => {
  //       this.setState({ usuario: data })
  //     })
  //     .catch((erro) => {
  //       console.log(erro)
  //     })
  // }

  // atualizarEstadoNome(event) {
  //   this.setState({ usuarioNome: event.target.value })
  // }

  buscarEvento() {
    fetch('https://localhost:5001/api/eventotbl/perfilusuario/' + this.state.usuarioId)
      .then(resposta => resposta.json())
      .then(data => {
        this.setState({ evento: data })
      })
      .catch(erro => {
        console.log(erro);
      })
  }

  atualizarEstadoNome(event) {
    this.setState({ eventoNome: event.target.value })
  }

  atualizarEstadoDescricao(event) {
    this.setState({ eventoDescricao: event.target.value })
  }

  atualizarEstadoData(event) {
    this.setState({ eventoData: event.target.value })
  }

  atualizarEstadoHorarioComeco(event) {
    this.setState({ eventoHorarioComeco: event.target.value })
  }

  atualizarEstadoHorarioFim(event) {
    this.setState({ eventoHorarioFim: event.target.value })
  }

  alterarEvento = (evento) => {
    this.setState({
      editarModal: {
        eventoId: evento.eventoId,
        eventoNome: evento.eventoNome,
        eventoDescricao: evento.eventoDescricao,
        eventoData: evento.eventoData,
        eventoHorarioComeco: evento.eventoHorarioComeco,
        eventoHorarioFim: evento.eventoHorarioFim
      }
    })
    console.log(this.state.evento.eventoId);
    console.log(this.state.evento.eventoNome);
    console.log(this.state.evento.eventoDescricao);
    console.log(this.state.evento.eventoData);
    console.log(this.state.evento.eventoHorarioComeco);
    console.log(this.state.evento.eventoHorarioFim);

    this.toggle();
  }

  salvarAlteracoes = (event) => {
    event.preventDefault();

    fetch('https://localhost:5001/api/eventotbl/' + this.state.evento.eventoId, {
      method: "PUT",
      body: JSON.stringify(this.state.editarModal),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(resposta => resposta.json())
      .then(setTimeout(() => {
        this.buscarEvento()
      }, 1000)
      )
      .catch(erro => console.log(erro))
    this.toggle();
  }


  atualizaEditarModalNome(event) {
    this.setState({
      editarModal: {
        eventoId: this.state.editarModal.eventoId,
        eventoNome: event.target.value,
      }
    })
  }

  atualizaEditarModalDescricao(event) {
    this.setState({
      editarModal: {
        eventoId: this.state.editarModal.eventoId,
        eventoDescricao: event.target.value,
      }
    })
  }

  atualizaEditarModalData(event) {
    this.setState({
      editarModal: {
        eventoId: this.state.editarModal.eventoId,
        eventoData: event.target.value,
      }
    })
  }

  atualizaEditarModalComeco(event) {
    this.setState({
      editarModal: {
        eventoId: this.state.editarModal.eventoId,
        eventoHorarioComeco: event.target.value,
      }
    })
  }

  atualizaEditarModalFim(event) {
    this.setState({
      editarModal: {
        eventoId: this.state.editarModal.eventoId,
        eventoHorarioFim: event.target.value,
      }
    })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.buscarEvento();
  }

  render() {
    return (
      <div>
        <CabecalhoBotao />
        <main className="main-editar-evento-perfil-usuario">

          <section className="secao-geral-descricao4">

            <section className="container_descrição4">

              <div key={this.state.evento.eventoId} className="esquerda_topo_descrição4">
                <h1 className="h1_descrição4">{this.state.evento.eventoNome}</h1>
              </div>

              <div className="usuario_descrição4">

                <div className="imagem-usuario4">
                  <img src={require("../assets/imagens/iconeUsuario.png")} alt="Logo da comunidade Nerdzão, um desenho de um cérebro rosa com um ocúlos de armação preta" />
                </div>

                <div key={this.state.usuario.usuarioId} className="nome-usuario-descrição4-evento">
                  <p>{this.state.usuario.usuarioNome}</p>
                </div>

              </div>

              <div className="descrição4_descrição4">

                <div className="imagem-evento4">
                  <img src={require("../assets/imagens/Evento1.jpeg")} alt="Banner do evento Nerdgirlz #22 - Panic! at the LINUX, com um fundo roxo." />
                </div>

                <div key={this.state.evento.eventoId} className="descricao4-evento">
                  <p className="titulo-descrição4">Detalhes</p>
                  <p>Data: 07/08/2019</p>
                  <p>Hora: 19h</p>
                  <p>Local do evento: ThoughtWorks São Paulo - Av Paulista, 2300, 4º andar</p>
                  <p>Talk 1: "De Java para Kotlin - primeiros passos de uma jornada possível no backend"</p>
                  <p>Palestrante: Rosi e Ailton</p>
                  <p>Talk 2: Saúde Mental</p>
                  <p>Palestrante: Jefferson Santos</p>
                  <p>Fishbowl: Qual o impacto das pequenas comunidades no movimento social negro?</p>
                  <p>Facilitadoras: Marylly e Ailton.</p>
                </div>

              </div>

            </section>

            <section className="quadrado_forades4">
              <div className="direita_topo_descrição4">
                <div className="botao-edicao-concluida-descricao4-evento">
                  <button type="submit" onClick={i => this.alterarEvento(this.state.evento)}>Editar</button>
                </div>
                <div className="botao-deletar-descricao4-evento">
                  <button type="submit">Deletar</button>
                </div>
              </div>
              <div className="info_descrição4">
                <div className="textoinfo_descrição4">
                  <div className="parte1_descrição4">
                    <div className="data_descrição4">
                      <div className="data_img-descrição4">
                        <img src={require("../assets/imagens/clock.png")} alt="" />
                        <p>Data e Horário</p>
                      </div>
                      <div key={this.state.evento.eventoId} className="data-horario-descrição4">
                        <p>Dia 03 de setembro de 2019</p>
                        <p>Das 10h00 às 13h00 </p>
                      </div>
                    </div>
                  </div>
                  <div className="parte2_descrição4">
                    <div className="local_descrição4">
                      <div className="nome_local_img-descrição4">
                        <img src={require("../assets/imagens/pin.png")} alt="Pin de localização" />
                        <p>Localização</p>
                      </div>
                      <div key={this.state.evento.eventoId} className="endereco_local_img-descrição4">
                        <p>ThoughtWorks - Av. Paulista 2300, Conjunto 41</p>
                        <p>São Paulo - SP</p>
                        <p> Lounge</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="parte3_descrição4">
                  <img src={require("../assets/imagens/maps.png")} alt="Pin de localização" />
                </div>
              </div>
            </section>
          </section>
        </main>

        <MDBContainer>
          <form onSubmit={this.salvarAlteracoes}>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>Editar Evento <b> {this.state.editarModal.eventoNome} </b></MDBModalHeader>
              <MDBModalBody key={this.state.editarModal.eventoId} >
                <MDBInput
                  label='Nome'
                  value={this.state.editarModal.eventoNome}
                  onChange={this.atualizaEditarModalNome.bind(this)}
                />
                <MDBInput
                  label='Descrição'
                  value={this.state.editarModal.eventoDescricao}
                  onChange={this.atualizaEditarModalDescricao.bind(this)}
                />
                <MDBInput
                  label='Data'
                  value={this.state.editarModal.eventoData}
                  onChange={this.atualizaEditarModalData.bind(this)}
                />
                <MDBInput
                  label='Horário Começo'
                  value={this.state.editarModal.eventoHorarioComeco}
                  onChange={this.atualizaEditarModalComeco.bind(this)}
                />
                <MDBInput
                  label='Horário Fim'
                  value={this.state.editarModal.eventoHorarioFim}
                  onChange={this.atualizaEditarModalFim.bind(this)}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Cancelar</MDBBtn>
                <MDBBtn type="submit" color="primary">Salvar</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </form>
        </MDBContainer>

        <Rodape />
      </div>
    );
  }


}







export default EditarEventoPerfilUsuario;