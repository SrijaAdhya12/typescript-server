import users from '../models/schema';
const fetchAllUsers = () => {
    return users;
};
// Controller function to get all users
export const getAllUsers = (req, res) => {
    try {
        const users = fetchAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
export const createUser = (req, res) => {
    try {
        const { id, name, email } = req.body;
        if (!id || !name || !email) {
            res.status(400).json({ message: 'All fields (id, name, email, password) are required' });
            return;
        }
        // Check if user already exists
        const existingUser = users.find(user => user.id === id || user.email === email);
        if (existingUser) {
            res.status(400).json({ message: 'User with this id or email already exists' });
            return;
        }
        const newUser = { id, name, email };
        users.push(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
//# sourceMappingURL=users.js.map