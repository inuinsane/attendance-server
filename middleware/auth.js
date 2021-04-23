import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token; //get a token from request

        if (!token) {
            res
                .status(401)
                .json({ errorMessage: "Unauthorized" });
        }
        else {

            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified.user;
            next();
        }


    }

    catch (err) {
        console.error(err);
        res
            .status(401)
            .json({ errorMessage: "Unauthorized" });

    }
}

export default auth;