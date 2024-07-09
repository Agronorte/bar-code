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

document.addEventListener('DOMContentLoaded', function() {
    const orderField = document.getElementById('order');
    const barcodeField = document.getElementById('barcode');
    const resultDiv = document.getElementById('result');

    // Função para mostrar mensagens
    function showNotification(message, className) {
        resultDiv.textContent = message;
        resultDiv.className = className;
        resultDiv.style.display = 'block';
    }

    function hideNotification() {
        resultDiv.style.display = 'none';
    }

    function showStatusMessage(message, className) {
        resultDiv.textContent = message;
        resultDiv.className = className;
        resultDiv.style.display = 'block';
    }

    // Função para validar entrada de números no campo de ordem
    orderField.addEventListener('input', function() {
        const originalValue = this.value;
        this.value = this.value.replace(/\D/g, '');

        if (this.value !== originalValue) {
            showNotification('Apenas números são permitidos.', 'notification');
        } else {
            hideNotification();
        }
    });

    // Prevenção de entrada de letras no campo de ordem
    orderField.addEventListener('keypress', function(event) {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
            showNotification('Apenas números são permitidos.', 'notification');
        } else {
            hideNotification();
        }
    });

    // Prevenção de entrada de letras ao colar texto
    orderField.addEventListener('paste', function(event) {
        const pasteData = event.clipboardData.getData('text');
        if (!/^\d+$/.test(pasteData)) {
            event.preventDefault();
            showNotification('Apenas números são permitidos.', 'notification');
        } else {
            hideNotification();
        }
    });

    // Função para enviar dados
    function sendData(data) {
        showStatusMessage('Enviando dados...', 'status');

        fetch('https://seu-servidor.com/api/send-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            showStatusMessage('Dados enviados com sucesso!', 'status-success');
        })
        .catch((error) => {
            console.error('Erro:', error);
            showStatusMessage('Erro ao enviar dados.', 'status-error');
        });
    }

    // Evento para detectar a leitura do código de barras
    barcodeField.addEventListener('input', function() {
        if (this.value) {
            const generatedNumber = Math.floor(Math.random() * 10000); // Simula a geração de um número
            orderField.value = generatedNumber;

            // Dados a serem enviados
            const data = {
                order: generatedNumber,
                barcode: this.value
            };

            // Enviar os dados
            sendData(data);
        }
    });
});
