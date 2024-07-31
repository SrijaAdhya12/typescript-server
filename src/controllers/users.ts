import users from '../models/schema';
import { User } from "../models/schema"
import express from "express"

const fetchAllUsers = (): User[] => {
    return users;
};


// Controller function to get all users
export const getAllUsers = (req: express.Request, res: express.Response): void  => {
     try {
        const users: User[] = fetchAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const createUser = (req: express.Request, res: express.Response): void => {
  try {
      const { id, name, email } = req.body as { id: number, name: string, email: string };
     
        if (!id || !name || !email ) {
            res.status(400).json({ message: 'All fields (id, name, email, password) are required' });
            return;
        }
        // Check if user already exists
        const existingUser = users.find(user => user.id === id || user.email === email);
        if (existingUser) {
            res.status(400).json({ message: 'User with this id or email already exists' });
            return;
        } 
    const newUser: User = { id, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};


