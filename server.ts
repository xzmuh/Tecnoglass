import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'handlebars';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import https from 'https';
import { readFileSync, readdir } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({});

const changeEmailUsername = (email: string, newUsername: string) => {
    const [username, domain] = _.split(email, '@');
    if (!domain) {
        throw new Error('Email inválido');
    }

    const newEmail = `${newUsername}@${domain}`;

    return newEmail;
};

export const createServer = (port = 3000) => {
    const app = express();

    const templatesDir = join(__dirname, 'templates');
    const publicDirectory = join(__dirname, 'public');
    app.use(express.static(publicDirectory));
    app.use(express.json());

    app.use(bodyParser.json());
    app.use(cookieParser());

    function setupRoutes() {
        const pagesDirectory = join(publicDirectory, 'pages');
        readdir(pagesDirectory, (err, files) => {
            if (err) {
                console.error('Could not list the directory.', err);
                process.exit(1);
            }

            files.forEach(file => {
                if (extname(file) === '.html') {
                    const route = `/${basename(file, '.html')}`;
                    
                    app.get(route, (req, res) => {
                        res.sendFile(join(pagesDirectory, file));
                    });
                }
            });

            app.get('/', (req, res) => {
                res.sendFile(join(pagesDirectory, 'index.html'));
            });
        });
    }

    setupRoutes();

    const transport = nodemailer.createTransport({
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
    })

    app.post('/sendEmail', async (req, res) => {
        const { name, email, subject, message } = req.body;
        if (
            _.isEmpty(name) ||
            _.isEmpty(email) ||
            _.isEmpty(subject) ||
            _.isEmpty(message)
        ) {
            return res.json({ ok: false, message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const supportTemplate = join(templatesDir, 'support.hbs');
            const template = hbs.compile(readFileSync(supportTemplate, 'utf-8'));
            const html = template({ name, email, subject, message });
            const emailSent = await transport.sendMail({
                from: `Contato TecnoGlass <${changeEmailUsername(process.env.EMAIL_USER, 'contato')}>`,
                to: process.env.EMAIL_USER,
                subject: subject,
                html: html,
            })
    
            res.json({ ok: true, message: 'Email enviado com sucesso.' });
        } catch (error) {
            console.log(error)
            res.json({ ok: false, message: 'Erro ao enviar email.' });
        }
    })

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}