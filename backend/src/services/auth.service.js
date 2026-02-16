const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../db/users.repo');

function signToken(user) {
    return jwt.sign(
        {sub: user.id, role: user.role, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    );
}

async function register({name, email, password}) {
    const existing = await userRepo.findUserByEmail(email);
    if (existing) {
        const error = new Error('Email já registado');
        error.status = 409;
        throw error;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const safeRole = "guest"; 

    const user = await userRepo.createUser({
        name, 
        email, 
        password_hash, 
        role: safeRole
    });

    const token = signToken(user);
    return {user, token};
}

async function login({email, password}) {
    const userRow = await userRepo.findUserByEmail(email);
    if (!userRow) {
        const err = new Error('Credenciais inválidas');
        err.status = 401;
        throw err;
    }

    const ok = await bcrypt.compare(password, userRow.password_hash || '');
    if (!ok) {
        const err = new Error('Credenciais inválidas');
        err.status = 401;
        throw err;
    }
    
    const user = {
        id: userRow.id,
        name: userRow.name,
        email: userRow.email,
        role: userRow.role
    };

    const token = signToken(user);
    return {user, token};
}

async function me(userId) {
    return await userRepo.findUserById(userId);
}

module.exports = {
    register,
    login,
    me
}