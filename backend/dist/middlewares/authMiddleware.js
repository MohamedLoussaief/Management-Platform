import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const requireAuth = async (req, res, next) => {
    // verify authorization
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }
    const token = authorization.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findOne({ _id });
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ error: 'Request is not authorized' });
    }
};
export const requireAdmin = async (req, res, next) => {
    const { user } = req;
    if (!user || user.userType !== "Admin") {
        return res.status(403).json({ error: 'Access forbidden' });
    }
    next();
};
//# sourceMappingURL=authMiddleware.js.map