const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;

    if (authToken) {
        const token = authToken.split(" ")[1];

        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decodedPayload;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token, access denied" });
        }
    } else {
        return res.status(401).json({ message: "No token provided, access denied" });
    }
}

// Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only admin" });
        }
    });
}

// Verify Token & Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only user himself" });
        }
    });
}

// Verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only user himself or admin" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
};
