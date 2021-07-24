import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

// Check if user is authenticated (has correct token)
export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization'); // Header 안에 Authorization 키의 값을 받아옴
    if(!(authHeader && authHeader.startsWith('Bearer '))) { // Auth 헤더가 비어있거나 Bearer 타입이 아니면 에러
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    // verify token correctness with the secret key used to create it
    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decode) => {
            if(error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decode.id);
            // Check if such user exists (double checked in the next callback)
            if(!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            // 만약 앞으로 이어지는 미들웨어의 콜백함수에서 계속 사용해야하는 데이터라면 아래와 같이 req.customData로 등록해줄수 있다.
            req.userId = user.id; // req자체에 user id를 추가
            next();
        }
    )

}