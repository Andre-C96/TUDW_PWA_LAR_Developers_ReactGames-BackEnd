const { getAllUsersService, getUserLoginService, updateUserProfileService, deleteUserService, createUserService } = require("../services/user.service");

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
        const userId = req.user.id;


        const user = await getProfileService({ userId });

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
};
const updateProfile = async (req, res) => {
    try {
        const idParam = Number(req.params.id);
        const userLogged = req.user;

        if (userLogged.id !== idParam && (!userLogged.role || userLogged.role.toUpperCase() !== 'ADMIN')) {
            return res.status(403).json({
                success: false,
                message: "Authorization failed: You do not have permission to update this profile"
            });
        }

        const profileData = req.body;
        if (!userLogged.role || userLogged.role.toUpperCase() !== 'ADMIN') {
            delete profileData.role;
        }
        const updatedUser = await updateUserProfileService(idParam, profileData);
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id, email } = req.body;
        if (!id && !email) {
            return res.status(400).json({
                success: false,
                message: "User ID or email is required to delete a user"
            });
        }
        await deleteUserService({ id, email });

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAll,
    getProfile,
    updateProfile,
    deleteUser
};