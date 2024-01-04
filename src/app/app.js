const express = require('express');
const employees = require('./db/firestore');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const data = await employees.getAllEmployees();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const data = await employees.getAllEmployees();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const data = await employees.getEmployeeById(employeeId)[0];
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await employees.signIn(email, password);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' })
    }
})

app.post('/addUserWithCredentials', async (req, res) => {
    try {
        const { email, password, phoneNumber } = req.body;
        const data = await employees.signUpUser(email, password, phoneNumber);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' })
    }
});

app.post('/addEmployee', async (req, res) => {
    try {
        const newEmployee = req.body;
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/employees/leaves/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const data = await employees.getLeaveDataByUserId(employeeId);

        if (!data) {
            res.status(404).json({ error: 'No matching leave data found for the user Id provided' });
        } else {
            res.status(200).json(data[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});