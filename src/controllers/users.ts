import users from '../models/schema';
import { User } from "../models/schema"
import express from "express"

const fetchAllUsers = (): User[] => {
  return users;
};


// Get all users
export const getAllUsers = (req: express.Request, res: express.Response): void => {
  try {
    const users: User[] = fetchAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


// create an user
export const createUser = (req: express.Request, res: express.Response): void => {
  try {
    const { id, name, email } = req.body as { id: number, name: string, email: string };

    if (!id || !name || !email) {
      res.status(400).json({ message: 'All fields (id, name, email, password) are required' });
      return;
    }
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


// update an user
export const updateUser = (req: express.Request, res: express.Response): void => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const updatedUser: User = {
      ...users[userIndex],
      name: name ?? users[userIndex].name,
      email: email ?? users[userIndex].email
    };

    users[userIndex] = updatedUser;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};


// delete an user
export const deleteUser = (req: express.Request, res: express.Response): void => {
  try {
    const userId = parseInt(req.params.id, 10);

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const deletedUser = users[userIndex];

    users.splice(userIndex, 1);

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}