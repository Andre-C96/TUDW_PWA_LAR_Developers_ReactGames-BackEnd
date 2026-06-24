const prisma = require('../prisma/prisma');
const bcrypt = require("bcrypt");

async function getAllUsersService() {
    return await prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    });
}
async function getProfileService({ userId }) {
    const user = await prisma.user.findUnique({
        where: { id: userId, deletedAt: null }
    });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    return user;
}
async function updateUserProfileService(userId, profileData) {
    const existUser = await prisma.user.findUnique({ where: { id: userId, deletedAt: null } });
    if (!existUser) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }

    let emailToUpdate = undefined;

    if (profileData.email) {
        const emailResult = validateEmail(profileData.email);
        if (!emailResult.success) {
            const error = new Error(emailResult.message);
            error.status = emailResult.status;
            throw error;
        }

        emailToUpdate = emailResult.emailCleaned;

        const existingEmail = await prisma.user.findUnique({ where: { email: profileData.email } });
        if (existingEmail && existingEmail.id !== userId) {
            const error = new Error('The email is already registered');
            error.status = 409;
            throw error;
        }
    }

    const updateData = {};

    if (emailToUpdate) updateData.email = emailToUpdate;
    if (profileData.password) updateData.password = await bcrypt.hash(profileData.password, 10);
    if (profileData.role) updateData.role = profileData.role;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    });

    return updatedUser;
}
async function deleteUserService({ id, email }) {
    const condicionesBusqueda = [];

    if (id) {
        condicionesBusqueda.push({ id: Number(id) });
    }

    if (email) {
        condicionesBusqueda.push({ email: email.trim().toLowerCase() });
    }

    if (condicionesBusqueda.length === 0) {
        const error = new Error('An ID or Email is required to delete a user');
        error.status = 400;
        throw error;
    }

    const existUser = await prisma.user.findFirst({
        where: {
            OR: condicionesBusqueda,
            deletedAt: null
        }
    });

    if (!existUser) {
        const error = new Error('User not found or already deleted');
        error.status = 404;
        throw error;
    }

    const deletedUser = await prisma.user.update({
        where: { id: existUser.id },
        data: { deletedAt: new Date() },
        select: { id: true, email: true, deletedAt: true }
    });

    return deletedUser;
}

module.exports = {
    getAllUsersService,
    getProfileService,
    updateUserProfileService,
    deleteUserService,
};