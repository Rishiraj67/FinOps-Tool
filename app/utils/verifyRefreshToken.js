import jwt from 'jsonwebtoken';

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return { valid: true, data: decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
};

const generateRefreshToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '120d',
    });
    return token;
};

export { verifyRefreshToken, generateRefreshToken };