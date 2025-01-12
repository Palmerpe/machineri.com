
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const app = express();

// Configura winston para los registros
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Usa helmet para establecer los encabezados HTTP de seguridad
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'POST',
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Ruta para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/contact', [
    body('nombre').isString().escape(),
    body('email').isEmail().normalizeEmail(),
    body('mensaje').isString().escape(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, mensaje } = req.body;

    console.log('Datos recibidos:', { nombre, email, mensaje });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `Nuevo mensaje de ${nombre}`,
        text: mensaje,
    };

    try {
        console.log('Enviando correo con las siguientes opciones:', mailOptions);
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado correctamente.');
        res.status(200).send('Correo enviado correctamente.');
    } catch (error) {
        logger.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo.');
    }
});

// Manejo global de errores
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});





