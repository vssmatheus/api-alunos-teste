const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let alunos = [];
let nextId = 1;

app.post('/alunos', (req, res) => {
  const aluno = req.body;
  aluno.id = nextId++;
  alunos.push(aluno);
  res.json(aluno);
});

app.get('/alunos', (req, res) => {
  res.json(alunos);
});

app.put('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
  if (alunoIndex !== -1) {
    alunos[alunoIndex] = { ...alunos[alunoIndex], ...req.body };
    res.json(alunos[alunoIndex]);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

app.delete('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alunoIndex = alunos.findIndex(aluno => aluno.id === id);
  if (alunoIndex !== -1) {
    const alunoRemovido = alunos.splice(alunoIndex, 1);
    res.json(alunoRemovido[0]);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
