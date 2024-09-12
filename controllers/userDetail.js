const User = require('../models/User');

const userDetail = async (req, res) => {
    try {
        const userId = req.user.id;  
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving the user details",
            error: error.message,
        });
    }
};

module.exports = userDetail;
