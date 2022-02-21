import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { TarefasListResults } from '../components/customer/customer-list-results';
import { TarefasListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { tarefas } from '../__mocks__/tarefas';

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
        <TarefasListToolbar />
        <Box sx={{ mt: 3 }}>
          <TarefasListResults tarefas={[]} />
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
