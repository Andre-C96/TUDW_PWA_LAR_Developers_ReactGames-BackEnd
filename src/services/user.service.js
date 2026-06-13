const prisma = require('../prisma/prisma');

async function getAllUsersService() {
    return await prisma.user.findMany();
}
async function getUserProfileService(user) {
    return await prisma.user.findUnique({
        where: { email: user.email, password: user.password }
    });
}
async function updateUserProfileService(userId, profileData) { }
async function deleteUserService(userId) { }

async function createUserService(userData) {

    const { email, password, role } = userData;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error("El email ya está registrado");
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role || "USUARIO",
        },
    });  

    return {
        user: { id: user.id, email: user.email, role: user.role }
    };
}


module.exports = {
    getAllUsersService,
    getUserProfileService,
    updateUserProfileService,
    deleteUserService,
    createUserService
};