const admin = require('firebase-admin');
const serviceAccount = require('../keys/mc-emply-portal-firebase-adminsdk-488n6-4164bb1c15.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mc-emply-portal-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

async function getAllEmployees() {
    try {
      const snapshot = await db.collection('employees').get();
      const data = snapshot.docs.map(doc => {
        return {
          UserId: doc.id,
          UserInfo: doc.data()
        }
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  // Function to get a specific employee by ID
  async function getEmployeeById(employeeId) {
    try {
      const snapshot = await db.collection('employees').where('EmployeeId', '==', employeeId).get();
      const data = snapshot.docs.map(doc => ({
        UserId: doc.id,
        UserInfo: doc.data()
      }));
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  module.exports = {
    getAllEmployees,
    getEmployeeById
  };