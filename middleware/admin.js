import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const admin = async (req, res, next) => {
    try {
        const token = req.cookies.token; //get a token from request

        if (!token) {
            res
                .status(401)
                .json({ errorMessage: "Unauthorized" });
        }
        else {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            const currentUser = await User.findOne({ _id: verified.user });
            if (currentUser.role === 'admin') {
                next();
            } else {
                res
                    .status(401)
                    .json({ message: 'Unauthorized' });
            }
        }

    }

    catch (err) {
        console.error(err);
        res
            .status(401)
            .json({ errorMessage: "Unauthorized" });

    }
}

export default admin;