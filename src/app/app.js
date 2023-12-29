const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/employees', async (req, res) => {
    try {
        const snapshot = await db.collection('employees').get();
        const data = snapshot.docs.map(doc => {
            return {
                UserId: doc.id,
                UserInfo: doc.data()
            }
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const snapshot = await db.collection('employees').get();
          const data = snapshot.docs.map(doc => {
            if(doc.data().find(user => user.EmployeeId === employeeId)){
                
            }
          });
        console.log(employeeId);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});