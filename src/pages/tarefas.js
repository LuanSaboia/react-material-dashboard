import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { TarefasListResults } from '../components/customer/customer-list-results';
import { TarefasListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { tarefas } from '../__mocks__/tarefas';
import axios from 'axios'
import { useState } from 'react';

const API_URL = 'http://minhastarefas-api.herokuapp.com/tarefas'
const headers = { 'x-tenant-id' : 'fulano@email.com' }

const salvar = (tarefa) => {
  axios.post(API_URL, tarefa, {
    headers: headers
  }).then( response => {
    console.log(response.data)
  }).catch( erro => {
    console.log(erro)
  })
}

const listarTarefas = () => {
  axios.get(API_URL, {
    headers : headers
  }).then( response => {
    const listaDeTarefas = response.data
    
  })
}

const Tarefas = () => (
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
          <TarefasListResults tarefas={tarefas} />
        </Box>
      </Container>
    </Box>
  </>
);
Tarefas.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Tarefas;
