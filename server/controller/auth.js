import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import bcrypt from 'bcrypt';

// JWT Secret Key
// TODO: Make it secure!
const jwtSecretKey = 'VctqLpa73cX9kKa9gHHhwDd6Xz9W5Hxk';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

// ## This function should be removed. Highly insecure ##
// Get all users (for test purpose)
export async function getAll(req, res, next) {
    const allUsers = await userRepository.getAll();
    res.status(200).json(allUsers)
}


// Sign up user
export async function signUp(req, res, next) {
    const { username, password, name, email, url } = req.body;

    // Check if user with same username already exists
    const found = await userRepository.getUserByUsername(username);
    if(found) {
        return res.status(409).json({ message: `${username} already exists` });
    }

    // encrypt password before sending it to DB
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);

    // Register new user
    const userId = await userRepository.createUser({
        username,
        password: hashed, 
        name, 
        email, 
        url
    });

    // Create JWT token and insert it to header (Default expiration time is 24 hours)
    const token = createJwtToken(userId);

    // res.header("JWT-Token", token);
    res.status(201).json({ token, username })
}

// Login user
export async function login(req, res, next) {
    const { username, password } = req.body;

    // Check if user with provided username exists
    const user = await userRepository.getUserByUsername(username);
    if(!user) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    // Compare user typed password with encrypted password in the database
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    // Default expiration time is 24 hours
    const token = createJwtToken(user.id);

    // insert token to header
    // res.header("Jwt-Token", token);
    return res.status(200).json({ token, username })
}

// Create JWT token
function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecretKey, {expiresIn: jwtExpiresInDays})
}

// Check if currently holding token is available
// export async function checkTokenAvailable(req, res, next) {
//     const token = req.headers["authorization"];
//     console.log(token);
//     let username;
//     // Check if token is still available
//     jwt.verify(token, jwtSecretKey, (error, decoded) => {
//         if(error) {
//             return res.sendStatus(401);
//         }
//         console.log(decoded);
//         // res.header("Jwt-Token", token);
//         res.status(200).json({token, username})
//     })
// }

export async function me(req, res, next) {
    const user = await userRepository.getUserById(req.userId); // access custom data
    // Double check if user exists (primary check is done in auth middleware (previous callback))
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, username: user.username})
}