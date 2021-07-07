// Mock Data
let users = [
    {
        id: '1',
        username: 'jason123',
        password: 'jasonpw',
        name: 'Jason',
        email: 'jason@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    },
    {
        id: '2',
        username: 'hanna123',
        password: 'hannapw',
        name: 'Hanna',
        email: 'hanna@gmail.com',
    },
    {
        id: '3',
        username: 'bob123',
        password: 'bobpw',
        name: 'Bob',
        email: 'bob@gmail.com',
    }
];

// ## This function should be removed. Highly insecure ##
// Get all users
export async function getAll() {
    return users;
}

// Get a specified user with id
export async function getUserById(id) {
    return users.find((user) => user.id === id);
}

// Get a specified user with matching ID and PW
export async function getUserByCred(username, password) {
    return users.find((user) => user.username === username && user.password === password);
}

// Check if username is duplicate
export async function isDuplicateUsername(username) {
    const duplicate = users.find(user => user.username === username);
    if(duplicate) {
        return true;
    } else {
        return false;
    }
}

// Add a user
export async function signUp(username, password, name, email, url = undefined) {
    // // Create new user and insert to database
    const user = {
        id: Date.now().toString(),
        username,
        password,
        name,
        email,
        ...(url && {url} ) // 여기는 엘리가 어떻게 했을까?
    }

    users = [user, ...users];
    return user;
}