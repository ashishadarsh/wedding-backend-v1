import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI
const dbName = 'Wedding-planar'; // Replace with your database name
const collectionName1 = 'budget';
const collectionName2 = 'guest'; // Replace with your collection name
const collectionName3 = 'user';

// async function insertDocument() {
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     // Connect to the MongoDB server
//     await client.connect();

//     // Access the database
//     const db = client.db(dbName);

//     // Access the collection
//     const collection = db.collection(collectionName);

//     // Define the document to be inserted
//     const documentToInsert = {
//       expenseType: 'Apparel',
//       expense: "Manicure & Pedicure",
//       estimatedPrice: "15000",
//       assignedTo: "Juhi",
//       lastUpdatedDate: new Date()
//     };

//     // Insert the document
//     const result = await collection.insertOne(documentToInsert);

//     console.log(`Document inserted with _id: ${result.insertedId}`);
//   } finally {
//     // Close the connection when done
//     await client.close();
//   }
// }

// insertDocument().catch(console.error);

// async function insertManyDocument() {
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
  
//     try {
//       // Connect to the MongoDB server
//       await client.connect();
  
//       // Access the database
//       const db = client.db(dbName);
  
//       // Access the collection
//       const collection = db.collection(collectionName);
  
//       // Define the document to be inserted
//     //   const documentToInsert = [
//     //     {
//     //         expenseType: 'Apparel',
//     //         expense: "Bridesmaid Accessories",
//     //         estimatedPrice: "35000",
//     //         assignedTo: "Akash",
//     //         lastUpdatedDate: new Date()
//     //     },
//     //     {
//     //         expenseType: 'Entertainment',
//     //         expense: "Sound System & DJ",
//     //         estimatedPrice: "20000",
//     //         assignedTo: "Abhik",
//     //         lastUpdatedDate: new Date()
//     //     }
//     // ];

//     const documentToInsert = [
//       {
//           name: 'Rohit Pal',
//           inviteMedium: "Email",
//           inviteSent: "Yes",
//           email: "rohitpal@senraco.com",
//           address: "1599 Francis Mine Chico, 987654",
//           attendee: "Akash"
//       },
//       {
//           name: 'Sameer Ansari',
//           inviteMedium: "Call",
//           inviteSent: "No",
//           email: "sameeransari@toyo.com",
//           address: "1599 Francis Mine Chico, 987654",
//           attendee: "Ashish"
//       },
//       { 
//           name: 'Sushma Choubey',
//           inviteMedium: "Card",
//           inviteSent: "Yes",
//           email: "sushma83@gmail.com",
//           address: "1599 Francis Mine Chico, 987654",
//           attendee: "Juhi"
//       }
//   ];
  
//       // Insert the document
//       const result = await collection.insertMany(documentToInsert);
  
//       console.log(`Document inserted with _id: ${result}`);
//     } finally {
//       // Close the connection when done
//       await client.close();
//     }
//   }

//   insertManyDocument().catch(console.error);

async function fetchBudgets() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName1);
  
      // Use find() to retrieve data from the collection
      const budgets = await collection.find().toArray();
      
      return budgets;
    } finally {
      await client.close();
    }
  }

  export { fetchBudgets };

async function fetchGuests() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName2);
  
      // Use find() to retrieve data from the collection
      const guests = await collection.find().toArray();
      
      return guests;
    } finally {
      await client.close();
    }
  }

  export { fetchGuests };

  async function fetchBudgetById(id) {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName1);
  
      // Use find() to retrieve data from the collection
      const budgets = await collection.findOne({ _id: new ObjectId(id) });
      
      return budgets;
    } finally {
      await client.close();
    }
  }

  export { fetchBudgetById };

  // Connect to MongoDB and save data
  
  
  
  
  
  
  async function saveBudget({ id, expenseType, expense, estimatedPrice, assignedTo }) {
    const client = new MongoClient(uri);
  
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log('Connected to MongoDB');
  
      // Specify the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName1);
  
      // Initialize the query
      let query = {};
  
      // If an id is provided, set the query for that id
      if (id) {
        query = { _id: new ObjectId(id) };
      }
      console.log({id});
  
      // Define the data to be saved
      const budgetData = {
        expenseType: expenseType,
        expense: expense,
        estimatedPrice: estimatedPrice,
        assignedTo: assignedTo,
        lastUpdatedDate: new Date(),
      };

      if(!id) {
        const result = await collection.insertOne(budgetData);
        return result;
      }
  
      // Use findOneAndUpdate to insert or update the document
      const options = {
        upsert: true,
        returnOriginal: false, // Ensure that the updated document is returned
      };
  
      // Perform the update and explicitly return the updated document
      const updatedDocument = await collection.findOneAndUpdate(query, { $set: budgetData }, options);
  
      console.log('Budget updated or inserted successfully');
      console.log("Updated Document:", updatedDocument);
      
      return updatedDocument;
    } catch (error) {
      console.error('Error saving budget:', error);
    } finally {
      // Close the MongoDB client when done
      client.close();
    }
  }

// // Call the saveExpense function to save data
export { saveBudget };

async function saveUserInDB({ email, password }) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName3);

    // Define the data to be saved
    const userData = {
      email: email,
      password: password,
      registeredDate: new Date(),
    };

      const result = await collection.insertOne(userData);
      const user = await collection.findOne({ email:email });
      return user;
    

    // Use findOneAndUpdate to insert or update the document
    // const options = {
    //   upsert: true,
    //   returnOriginal: false, // Ensure that the updated document is returned
    // };

    // Perform the update and explicitly return the updated document
    // const updatedDocument = await collection.findOneAndUpdate(query, { $set: userData }, options);

    // console.log('Budget updated or inserted successfully');
    // console.log("Updated Document:", updatedDocument);
    
    // return updatedDocument;
  } catch (error) {
    console.error('Error saving user:', error);
  } finally {
    // Close the MongoDB client when done
    client.close();
  }
}

// // Call the saveExpense function to save data
export { saveUserInDB };


async function getUserByEmail(email) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName3);

    // Use find() to retrieve data from the collection
    const user = await collection.findOne({ email:email });
    
    return user;
  } finally {
    await client.close();
  }
}

export { getUserByEmail };

