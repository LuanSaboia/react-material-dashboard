import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import axios from 'axios'
import AlarmIcon from '@mui/icons-material/Alarm';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';

axios.get('http://minhastarefas-api.herokuapp.com/tarefas', {
  headers: { 'x-tenant-id' : 'fulano@email.com' }
}).then( resposta => {
  console.log(resposta.data)
})

export const TarefasListResults = props => {
  const { tarefas, ...rest} = props;
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tarefas.map( tarefa => {
                return(
                  <TableRow key={tarefa.id}>
                    <TableCell>{tarefa.id}</TableCell>
                    <TableCell>{tarefa.descricao}</TableCell>
                    <TableCell>{tarefa.categoria}</TableCell>
                    <TableCell>{ tarefa.done ? 'Feito' : 'Pendente' }</TableCell>
                    <TableCell>
                    <IconButton onClick={e => props.alterarStatus(tarefa.id)} color="secondary">
                      { tarefa.done ?
                        ( <DoneAllIcon /> ) :
                        ( <AlarmIcon /> )
                      }
                    </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={e => props.deleteAction(tarefa.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                )
              })

              }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TarefasListResults.propTypes = {
  tarefas: PropTypes.array.isRequired,
};
