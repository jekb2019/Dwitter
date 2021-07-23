import dotenv, { parse } from 'dotenv';
dotenv.config();

// 개발 단계에서 특정한 환경변수가 존재하는지 동적으로 알려줌
function required(key, defaultValue = undefined) {
    // 우리는 .env파일 자체에서가 아닌 환경변수 파일에서 읽어보기 때문에, .env파일을 안써도 터미널에서 우리가 원하는 것을 추가할 수 있다.
    const value = process.env[key] || defaultValue;
    if(value == null) {
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
    //MySQL 때문에 추가한것
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        databse: required('DB_DATABASE'),
        password: required('DB_PASSWORD')
    }
};
