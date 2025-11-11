export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Map frontend role format to backend format
    const roleMap = {
      'donor': 'Donor',
      'receiver': 'Receiver',
      'verifier': 'Verifier'
    };

    const userRole = roleMap[req.user.role.toLowerCase()] || req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(' or ')}` 
      });
    }

    next();
  };
};

