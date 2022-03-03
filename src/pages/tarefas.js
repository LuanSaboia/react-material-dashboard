import Head from 'next/head';
import { 
  Box, 
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { TarefasListResults } from '../components/customer/customer-list-results';
import { TarefasListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
//import { tarefas } from '../__mocks__/tarefas';
import axios from 'axios'
import { useState, useEffect } from 'react';

const API_URL = 'http://minhastarefas-api.herokuapp.com/tarefas'

const Tarefas = () => {
  const [ tarefas, setTarefas ] = useState([]);
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ mensagem, setMensagem ] = useState('');

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers: { 'x-tenant-id' : localStorage.getItem('email_usuario_logado') }
    }).then( response => {
      const novaTarefa = response.data
      setTarefas( [...tarefas, novaTarefa] )
      setMensagem('Item adicionado com sucesso')
      setOpenDialog(true)
    }).catch( erro => {
      setMensagem('Ocorreu um erro')
      setOpenDialog(true)
    })
  }

  const listarTarefas = () => {
    axios.get(API_URL, {
      headers : { 'x-tenant-id' : localStorage.getItem('email_usuario_logado') }
    }).then( response => {
      const listaDeTarefas = response.data
        setTarefas(listaDeTarefas)
    }).catch( erro => {
      setMensagem('Ocorreu um erro: ', erro)
      setOpenDialog(true)
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers: { 'x-tenant-id' : localStorage.getItem('email_usuario_logado') }
    }).then( response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if(tarefa.id === id){
          tarefa.done = true;
        }
      })
      setTarefas(lista)
      setMensagem('Item atualizado com sucesso')
      setOpenDialog(true)
    }).catch( erro => {
      setMensagem('Ocorreu um erro: ', erro)
      setOpenDialog(true)
    })
  }

  const deletar = (id) => {
    axios.delete(`${API_URL}/${id}`, {
      headers: { 'x-tenant-id' : localStorage.getItem('email_usuario_logado') }
    })
    .then( response => {
        const lista = tarefas.filter( tarefa => tarefa.id !== id)
        setTarefas(lista)
        setMensagem('Item deletado com sucesso')
      setOpenDialog(true)
    }).catch( erro => {
      setMensagem('Ocorreu um erro: ', erro)
      setOpenDialog(true)
    })
  }

  useEffect(() => {
    listarTarefas();
  }, [] )

  return(
    <>
    <Head>
      <title>
        Tarefas | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <TarefasListToolbar salvar={salvar}/>
        <Box>
          <TarefasListResults 
            alterarStatus={alterarStatus}
            deleteAction={deletar}
            tarefas={tarefas} />
        </Box>

        <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
          <DialogTitle>Atenção</DialogTitle>
          <DialogContent>{mensagem}</DialogContent>
          <DialogActions><Button onClick={e => setOpenDialog(false)}>Fechar</Button></DialogActions>
        </Dialog>

      </Container>
    </Box>
    </>
  )
}
Tarefas.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Tarefas;
