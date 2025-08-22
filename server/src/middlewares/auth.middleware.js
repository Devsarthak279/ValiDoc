const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                errorMessage: "Unauthorized Request: No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token
        const decodedToken = jwt.verify(token, "access-token-seccret-22-2-0");
        if (!decodedToken._id) {
            return res.status(401).json({
                errorMessage: "Unauthorized Request: Invalid token",
            });
        }

        // Attach decoded data to req
        req.token = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({
            errorMessage: "Unauthorized Request: Token verification failed",
        });
    }
}

module.exports = verifyJWT;
