const { getAllUsersService, getUserLoginService, updateUserProfileService, deleteUserService,createUserService } = require("../services/user.service");

const getAll = async (req, res) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getProfile = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await getUserLoginService({ email, password });

        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        return res.status(error.status || 401).json({
            success: false,
            message: error.message
        });
    }
};// Pasa a auth como register cuando se implemente autenticación
const updateProfile = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const profileData = req.body;
        const updatedUser = await updateUserProfileService(userId, profileData);
        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id, email } = req.body;
        if (!id && !email) {
            return res.status(400).json({
                success: false,
                message: "You must provide either an ?id= or an ?email= query parameter."
            });
        }
        await deleteUserService({ id, email });

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
 }

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUserService(userData);
        return res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

module.exports = {
    getAll,
    createUser,
    getProfile,
    updateProfile,
    deleteUser
};