import User from "../models/user.js";
import jwt from "jsonwebtoken";
// creating token
const createToken = ({ _id, fullName, userType }, expireDate, secret) => {
    return jwt.sign({ _id, fullName, userType }, secret, { expiresIn: expireDate });
};
// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const fullName = user.firstName + ' ' + user.lastName;
        // Create Access Token
        const token = createToken({ _id: user._id, fullName, userType: user.userType }, '15m', process.env.ACCESS_TOKEN_SECRET);
        // Create refresh Token
        const refreshToken = createToken({ _id: user._id, fullName, userType: user.userType }, '7d', process.env.REFRESH_TOKEN_SECRET);
        // Create secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'none', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match refresh Token
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Forbidden' });
        const foundUser = await User.findOne({ _id: decoded._id }).exec();
        if (!foundUser)
            return res.status(401).json({ message: 'Unauthorized' });
        const fullName = foundUser.firstName + ' ' + foundUser.lastName;
        const token = createToken({ _id: foundUser._id, fullName, userType: foundUser.userType }, '15m', process.env.ACCESS_TOKEN_SECRET);
        res.json({ token });
    });
};
const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Cookie cleared' });
};
export { loginUser, logout, refresh };
//# sourceMappingURL=auth.js.map