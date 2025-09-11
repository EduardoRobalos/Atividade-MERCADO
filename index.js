const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'src')));

app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
});
