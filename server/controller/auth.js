import jsonwebtoken from 'jsonwebtoken';
import * as authRepository from '../data/auth.js';
import { validationResult } from 'express-validator';

// JWT Secret Key
const secretKey = 'VctqLpa73cX9kKa9gHHhwDd6Xz9W5Hxk';

// ## This function should be removed. Highly insecure ##
// Get all users (for test purpose)
export async function getAll(req, res, next) {
    const allUsers = await authRepository.getAll();
    res.status(200).json(allUsers)
}


// Sign up user
export async function signUp(req, res, next) {
    // Validation Error Checking
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }

    const { username, password, name, email, url } = req.body;

    // Check if user with same username already exists
    const isDuplicate = await authRepository.isDuplicateUsername(username);
    if(isDuplicate) {
        return res.sendStatus(409);
    }

    // Register new user
    const user = await authRepository.signUp(username, password, name, email, url);

    // Create JWT token and insert it to header (Default expiration time is 24 hours)
    const token = jsonwebtoken.sign({
        id: user.id,
        username: user.username
    }, secretKey, {expiresIn: 3600});

    res.header("JWT-Token", token);
    res.status(201).json(user)
}

// Login user
export async function login(req, res, next) {
    const { username, password } = req.body;

    // Login Validation
    const user = await authRepository.getUserByCred(username, password);
    // If Success, Create JWT token and insert it to header
    if(user) {
        // Default expiration time is 24 hours
        const token = jsonwebtoken.sign({
            id: user.id,
            username: user.username
        }, secretKey, {expiresIn: 3600}) 
        // insert token to header
        res.header("Jwt-Token", token);
        return res.status(200).json(username)
    }
    // If Failed, Return 404
    res.sendStatus(404);
}

// Check if currently holding token is available
export async function checkTokenAvailable(req, res, next) {
    const token = req.headers["jwt-token"];
    let username;
    // Check if token is still available
    jsonwebtoken.verify(token, secretKey, (error, decoded) => {
        if(error) {
            return res.sendStatus(401);
        }
        console.log(decoded);
        username = decoded.username
        res.header("Jwt-Token", token);
    })
    res.status(200).json(username)
}