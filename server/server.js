import express from "express";
import pino from "pino";
import cors from "cors";
import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 1000;
const app = express();
const logger = pino();

const usersFilePath = join(__dirname, 'users.json');
const projectsFilePath = join(__dirname, 'projects.json');
let users = JSON.parse(readFileSync(usersFilePath, 'utf-8'));
let projects = JSON.parse(readFileSync(projectsFilePath, 'utf-8'));

const corsOptions = {
    origin: `http://localhost:3000`,
    credentials: true
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// login api
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password cannot be empty.' });
    }

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }


    return res.status(200).json({ user: { username: username, role: user.role } });
});


// register api
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password cannot be empty.' });
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ error: 'Username already exists.' });
    }

    const newUser = { username, password, role: "student" };
    users.push(newUser);
    writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

    return res.status(201).json({ user: { username: username, role: newUser.role } });
});


// get projects api
app.get('/projects', (req, res) => {
    return res.status(200).json(projects);
})

// create project api
app.post('/projects/create', (req, res) => {
    const {
        title,
        author,
        contact,
        semester,
        description,
        tags,
        githubLink,
        websiteLink,
        class: className
    } = req.body;

    if (!title || !author || !semester || !description) {
        return res.status(400).json({ error: 'Missing required fields (title, author, semester, description).' });
    }

    const newProject = {
        title,
        author,
        contact: contact || '',
        semester,
        class: className || '',
        description,
        tags: tags || [],
        githubLink: githubLink || '',
        websiteLink: websiteLink || ''
    };

    projects.push(newProject);
    writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf-8');

    return res.status(200).json({ message: 'Project created successfully!', project: newProject });
});

// delete project api
app.put('/projects/:title', (req, res) => {
    const { title } = req.params;
    const updatedProject = req.body;

    const projectIndex = projects.findIndex(p => p.title === title);
    if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found.' });
    }

    projects[projectIndex] = updatedProject;

    try {
        writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf-8');
        res.status(200).json({ message: 'Project updated successfully.', project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project.' });
    }
});


app.listen(port, () => {
    logger.info(`Server active. Listening on port ${port}`);
});