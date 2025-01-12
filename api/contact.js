
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

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));

app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'POST',
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Ruta para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas adicionales para otras páginas HTML
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacto.html'));
});

app.get('/fabricacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'fabricacion.html'));
});

app.get('/mantenimiento-industrial', (req, res) => {
    res.sendFile(path.join(__dirname, 'mantenimiento-industrial.html'));
});

app.get('/montaje-desmontaje', (req, res) => {
    res.sendFile(path.join(__dirname, 'montaje-desmontaje.html'));
});

app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'nosotros.html'));
});

app.get('/obras-civiles', (req, res) => {
    res.sendFile(path.join(__dirname, 'obras-civiles.html'));
});

app.get('/puentes', (req, res) => {
    res.sendFile(path.join(__dirname, 'puentes.html'));
});

app.get('/tanques', (req, res) => {
    res.sendFile(path.join(__dirname, 'tanques.html'));
});

app.get('/techos', (req, res) => {
    res.sendFile(path.join(__dirname, 'techos.html'));
});

app.get('/mantenimiento-barcos', (req, res) => {
    res.sendFile(path.join(__dirname, 'mantenimiento-barcos.html'));
});

app.get('/electricidad', (req, res) => {
    res.sendFile(path.join(__dirname, 'electricidad.html'));
});

app.get('/escaleras', (req, res) => {
    res.sendFile(path.join(__dirname, 'escaleras.html'));
});

app.get('/mineria', (req, res) => {
    res.sendFile(path.join(__dirname, 'mineria.html'));
});

// Ruta para manejar solicitudes de contacto
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
        await transporter.sendMail(mailOptions);
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






