
// Sign up user
export async function signUp(req, res, next) {
    res.status(201).send("signup")
}

// Login user
export async function login(req, res, next) {
    res.status(200).send("login")
}

// Check if currently holding token is available
export async function checkTokenAvailable(req, res, next) {
    res.status(200).send("token avail")
}