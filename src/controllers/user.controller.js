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
        const user = await getUserProfileService(req.user);
        if (!user) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        return res.status(200).json({
            success: true,
            data: user,


        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}// Pasa a auth como register cuando se implemente autenticación
const updateProfile = async (req, res) => { }
const deleteUser = async (req, res) => { }
const createUser = async (req, res) => { }

module.exports = {
    getAll,
    createUser,
    getProfile,
    updateProfile,
    deleteUser
};