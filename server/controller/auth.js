import jsonwebtoken from 'jsonwebtoken';
import * as authRepository from '../data/auth.js';

// ## This function should be removed. Highly insecure ##
// Get all users (for test purpose)
export async function getAll(req, res, next) {
    const allUsers = await authRepository.getAll();
    res.status(200).json(allUsers)
}


// Sign up user
// 토근은 아직 구현 못했고, 데이터베이스에 새 유저 넣는것만 함
// 아이디 비번 중복 확인 아직 안함
export async function signUp(req, res, next) {
    const { username, password, name, email, url } = req.body;
    const user = await authRepository.signUp(username, password, name, email, url);
    res.status(201).json(user)
}

// Login user
export async function login(req, res, next) {
    const { username, password } = req.body;
    // check if a user with such id & pw exists
    const user = await authRepository.getUserByCred(username, password);

    // if user exists, create JWT
    // return JWT back to the client inside the header (200OK)
    if(user) {
        // create JWT
        const token = jsonwebtoken.sign({
            id: user.id
        },'VctqLpa73cX9kKa9gHHhwDd6Xz9W5Hxk')
        console.log(token);
        res.header("JWT-Token", token);
        return res.status(200).json(username)
    }
    res.sendStatus(404);
}

// Check if currently holding token is available
export async function checkTokenAvailable(req, res, next) {
    res.status(200).send("token avail")
}