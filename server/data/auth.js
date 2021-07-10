// Mock User Data
// jasonpw - $2b$12$ewY9o/gCzcY.tqVbmB46w.FJYcoLPGfxD.yEgh.Sl0CrvxIpEESgu
let users = [
    {
        id: '1',
        username: 'jason123',
        password: '$2b$12$ewY9o/gCzcY.tqVbmB46w.FJYcoLPGfxD.yEgh.Sl0CrvxIpEESgu',
        name: 'Jason',
        email: 'jason@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    }
];

// ## This function should be removed. Highly insecure ##
// Get all users
export async function getAll() {
    return users;
}

// Get a specified user with matching username
export async function getUserByUsername(username) {
    return users.find((user) => user.username === username);
}

// Get a specified user with  matching ig
export async function getUserById(id) {
    return users.find((user) => user.id === id);
}

// Add a user
export async function createUser(userInfo) {
    const createdUser = { ...userInfo, id: Date.now().toString() };
    users.push(createdUser);
    return createdUser.id;
}