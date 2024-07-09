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
