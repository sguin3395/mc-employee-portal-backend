const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const serviceAccount = require('../../keys/mc-emply-portal-firebase-adminsdk-488n6-4164bb1c15.json');

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
    // console.log(employeeId);
    const collectionRef = db.collection('employees');
    const snapshot = await collectionRef.where('EmployeeId', '==', Number(employeeId)).get();
    // console.log(snapshot);

    if (snapshot.empty) {
      console.log("No matching doc");
    }

    const data = [];
    snapshot.forEach(doc => data.push(doc.data()));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signUpUser(email, password, phoneNumber) {
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      phoneNumber: phoneNumber
    });
    console.log('Successfully created new user:', userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function signIn(email, password) {
  try {
    const authenticatedUser = await admin.auth().getUserByEmail(email);

    if (authenticatedUser) {
      // Check for additional conditions like password if needed
      // ...

      return {
        email: authenticatedUser.email,
        phoneNumber: authenticatedUser.phoneNumber,
        userId: authenticatedUser.uid
      };
    } else {
      // Handle the case where the user is not found
      return {
        error: 'User not found'
      };
    }

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // Handle specific user-not-found error
      return {
        error: 'User not found'
      };
    } else {
      // Handle other errors
      console.error('Error signing in:', error);
      throw error; // Re-throw the error for unhandled errors
    }
  }
}

async function registerUser(employeeData) {
  try {
    const userId = employeeData.UserInfo.UserId;
    const employeeId = employeeData.UserInfo.EmployeeId;

    // Use the EmployeeId as the document ID
    const userRef = db.collection('employees').doc(employeeId.toString());

    // Set the user data in Firestore
    await userRef.set(employeeData.UserInfo);

    console.log(`Successfully registered user with ID ${userId}`);

    return userId;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

async function getLeaveDataByUserId(employeeId) {
  try {
    const collectionRef = db.collection('leave-data');
    const snapshot = await collectionRef.where('EmployeeId', '==', Number(employeeId)).get();

    const data = [];

    if (snapshot.empty) {
      console.log("No matching doc");
      return;
    }

    snapshot.forEach(doc => data.push(doc.data()));

    return data;
  } catch (error) {
    console.error('Error featching leave data for the user:', error);
    throw error;
  }
}

async function registerUser(employeeData) {
  try {
    const userId = employeeData.UserInfo.UserId;
    const employeeId = employeeData.UserInfo.EmployeeId;

    // Use the EmployeeId as the document ID
    const userRef = db.collection('employees').doc(employeeId.toString());

    // Set the user data in Firestore
    await userRef.set(employeeData.UserInfo);

    console.log(`Successfully registered user with ID ${userId}`);

    return userId;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  signIn,
  signUpUser,
  registerUser,
  getLeaveDataByUserId
};