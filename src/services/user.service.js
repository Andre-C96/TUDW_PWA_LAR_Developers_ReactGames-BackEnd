const prisma = require('../prisma/prisma');
const bcrypt = require("bcrypt");

async function getAllUsersService() {
    return await prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    });
}
async function getUserLogin({ email, password }) {
    return await prisma.user.findUnique({
        where: { email: user.email }
    });

    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error("Credenciales inválidas");
    }
}
async function updateUserProfileService(userId, profileData) { }
async function deleteUserService(userId) { }

async function createUserService(userData) {

    const { email, password, role } = userData;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const error = new Error('The email is already registered');
        error.status = 409;
        throw error;
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: password,
            role: role || "USUARIO",
        },
    });

    return {
        user: { id: user.id, email: user.email, role: user.role }
    };
}


module.exports = {
    getAllUsersService,
    getUserLogin,
    updateUserProfileService,
    deleteUserService,
    createUserService
};