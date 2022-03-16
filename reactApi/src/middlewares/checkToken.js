const tk = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
        const verified = tk.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "token is not valid " });
    }
};