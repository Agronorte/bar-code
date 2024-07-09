const http = require('http');

const hostname = '192.168.100.169'; 

const port = 5500;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const order = document.getElementById('order').value;
        const barcode = document.getElementById('barcode').value;
        
        resultDiv.innerHTML = `
            <p>Ordem de Carga: ${order}</p>
            <p>Código de Barras: ${barcode}</p>
        `;
    });
});
