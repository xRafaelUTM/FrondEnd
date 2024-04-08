document.addEventListener('DOMContentLoaded', function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const optionServicio = JSON.parse(localStorage.getItem('optionServicio'));
    
    document.getElementById('nombreUsuario').textContent = `${usuarioDatos.nombres} ${usuarioDatos.apellidoPaterno} ${usuarioDatos.apellidoMaterno}`;
    

    if (optionServicio.optionServicio == "casa") {
        document.getElementById('tipo').textContent = `Hipotecario`;
        let imagen =  document.getElementById('imagenServicio');
        imagen.src = '../../../img/Casa.png';
        imagen.style = 'height: 8em;';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoHipotecario}`;
    }
    else if (optionServicio.optionServicio == "carro") {
        document.getElementById('tipo').textContent = `Carro`;
        let imagen = document.getElementById('imagenServicio');
        imagen.src = '../../../img/carro.png';
        imagen.style = 'height: 8em;';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoCarro}`;
    }
    else if (optionServicio.optionServicio == "colegiatura") {
        document.getElementById('tipo').textContent = `Colegiatura`;
        let imagen = document.getElementById('imagenServicio');
        imagen.src = '../../../img/Colegiatura.png';
        imagen.style = 'height: 8em;';
        document.getElementById('monto').textContent = `$${usuarioDatos.pagoColegiatura}`;
    }
});


document.getElementById('back-btn').addEventListener('click', function(){
    window.location.href = './creditos.html';
});

document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = '../../menu_principal.html';
});



document.getElementById('pagar').addEventListener('click', async function() {
    const usuarioDatos = JSON.parse(localStorage.getItem('usuarioDatos'));
    const optionServicio = JSON.parse(localStorage.getItem('optionServicio'));
    const tarjetaDebito = usuarioDatos.tarjetaDebito;
    const nombres = usuarioDatos.nombres + " " + usuarioDatos.apellidoPaterno + " " + usuarioDatos.apellidoMaterno;

    let optionPagoServicio = "";
    let monto = 0;

    if (optionServicio.optionServicio == "casa") {
        optionPagoServicio = "pagoHipotecario";
        monto = usuarioDatos.pagoHipotecario;
    }
    else if (optionServicio.optionServicio == "carro") {
        optionPagoServicio = "pagoCarro";
        monto = usuarioDatos.pagoCarro;
    }
    else if (optionServicio.optionServicio == "colegiatura") {
        optionPagoServicio = "pagoColegiatura";
        monto = usuarioDatos.pagoColegiatura;
    }

    try {
        const response = await fetch('/realizarPagoServicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ optionPagoServicio, tarjetaDebito, monto }),
        });

        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue OK');
        }

        const data = await response.json();
        if (data.success) {
            // Construir el mensaje del recibo
            const reciboMensaje = `Comprobante de Pago:\n\nTitular: ${nombres}\nOrigen de pago: ${tarjetaDebito}\nPago: ${optionPagoServicio}\nMonto pagado: $${monto}\n\nCualquier aclaración, consulte a su Rafita mas cercano.`;
            
            alert(reciboMensaje);
            window.location.href = '../menu_pagos.html';
        } else {
            alert('No se pudo realizar el depósito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Agregamos este registro
        alert('Error al conectar con el servidor.');
    }
});




