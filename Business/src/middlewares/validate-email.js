const validateEmail = (req, res, next) => {

const {email} = req.body;

const emailPattern = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;

if (!emailPattern.test(email)) {
  return res.status(403).json({ message: '"email" must be a valid' });
}  
 next();
}

module.exports = {validateEmail};