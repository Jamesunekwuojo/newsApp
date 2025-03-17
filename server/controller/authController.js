import jwt from "jsonwebtoken"

export const checkAuth = (req, res) => {

    try {
        // Extract token from cookie
        const token = req.cookies?.token; 
        if (!token) {
            return res.status(401).json({ authenticated: false, message: "No token found" });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ authenticated: false, message: "Invalid token" });
            }

            return res.json({ authenticated: true, user: decoded });
        });

    } catch (error) {
        return res.status(500).json({ authenticated: false, message: "Server error" });
    }

}