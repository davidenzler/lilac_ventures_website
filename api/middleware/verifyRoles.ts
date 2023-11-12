const verifyRoles = (req, res, next, allowedRoles) => {
  console.log("Attemping to verify roles for ", req.user);
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [allowedRoles];
    const roles = req.roles;
    const result = rolesArray.includes(roles)
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
