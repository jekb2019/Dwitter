// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
// let users = [
//     {
//       id: '1',
//       username: 'jason123',
//       password: '$2y$12$xbxiNkHXjPweBVPoIV3/V.INEyMUiLUjcAiEnBTBF5ZERraVGFEO',
//       name: 'Jason',
//       email: 'jason@gmail.com',
//       url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//     },
//   ];
import MongoDb from "mongodb";
import { getUsers } from "../database/database.js";

const ObjectID = MongoDb.ObjectID;


export async function findByUsername(username) {
  // return users.find((user) => user.username === username);
  return getUsers()
    .find({ username })
    .next()
    .then(mapOptionalUser);
}

export async function findById(id) {
  // return users.find((user) => user.id === id);
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

export async function createUser(user) {
  // const created = { ...user, id: Date.now().toString() };
  // users.push(created);
  // return created.id;
  return getUsers()
    .insertOne(user)
    .then((result) => result.ops[0]._id.toString());
}
  
function mapOptionalUser(user) {
  return user? { ... user, id: user._id.toString() } : user;
}

// import { db } from "../database/database.js";

// // ## This function should be removed. Highly insecure ##
// // // Get all users
// // export async function getAll() {
// //     return users;
// // }

// // Get a specified user with matching username
// export async function getUserByUsername(username) {
//     // return users.find((user) => user.username === username);
//     return db.execute('SELECT * FROM users WHERE username=?', [username])
//     .then(result => result[0][0]);
// }

// // Get a specified user with  matching ig
// export async function getUserById(id) {
//     // return users.find((user) => user.id === id);
//     return db.execute('SELECT * FROM users WHERE id=?', [id])
//     .then(result => result[0][0]);;
// }

// // Add a user
// export async function createUser(user) {
//     // const created = { ...user, id: Date.now().toString() };
//     // users.push(created);
//     // return created.id;
//     const { username, password, name, email, url } = user;
//     console.log("USER-----", username, password, name, email, url);
//     // import 한 Pool을 이용해서 SQL Query 실행
//     return db
//         .execute(
//             'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)', 
//             [username, password, name, email, url]
//         )
//         .then((result) => result[0].insertId);
// }