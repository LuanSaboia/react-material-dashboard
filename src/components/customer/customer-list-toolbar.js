import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import React, { useState } from 'react';
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";


export const TarefasListToolbar = (props) => {
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  

  const submit = ( event ) => {
    event.preventDefault();
    const tarefa = {
      descricao: descricao,
      categoria: categoria
    }
    props.salvar(tarefa)
  }

  return (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Tarefas
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={4}>
              <TextField
              fullWidth
              placeholder="Descrição da tarefa"
              label="Descrição: " 
              value={descricao}
              onChange={e => setDescricao(e.target.value)}/>
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth>
                <InputLabel>Categoria: </InputLabel>
                <Select label="Categoria: "
                value={categoria}
                onChange={e => setCategoria(e.target.value)}>
                  <MenuItem value="">Selecione...</MenuItem>
                  <MenuItem value={"TRABALHO"}>Trabalho</MenuItem>
                  <MenuItem value={"ESTUDOS"}>Estudos</MenuItem>
                  <MenuItem value={"OUTROS"}>Outros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <Button onClick={submit} variant="contained" color="secondary">Adicionar</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
  )
}
