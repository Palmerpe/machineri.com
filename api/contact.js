
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

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors({
    origin: '*', // Permitir solicitudes desde cualquier origen
    methods: 'POST',
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));

// Rutas para servir las páginas HTML
const pages = ['index', 'contacto', 'fabricacion', 'mantenimiento-industrial', 'montaje-desmontaje', 
              'nosotros', 'obras-civiles', 'puentes', 'tanques', 'techos', 'mantenimiento-barcos',
              'electricidad', 'escaleras', 'mineria'];

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, `${page}.html`));
    });
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



