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

// Get all users
async function getAll() {
    return users;
}

// Get a specified user
async function getUser(id) {
    return users.filter((user) => user.id === id);
}

// Add a user
export async function signUp() {

}