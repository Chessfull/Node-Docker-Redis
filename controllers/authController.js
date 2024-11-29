const User = require("../models/User");
const { generateToken } = require("../config/jwtConfig");

// ▼ Register a new user ▼
exports.register = async (req, res) => {
  
  try {
    const { email, password } = req.body; // -> Getting user infos from post body
    const existingUser = await User.findOne({ email }); // -> Checking if already signed or not

    if (existingUser)
      return res.status(400).json({ message: "User already exists ..." });

    // ▼ If not exist next to register ▼
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// ▼ Login and generate a JWT token ▼
exports.login = async (req, res) => {
  
  try {
    const { email, password } = req.body; // -> Getting user infos from body
    const user = await User.findOne({ email }); // -> Checking user with email exist or not
    
    if (!user || !(await user.comparePassword(password))) { // -> comparePassword coming from User module, so checking email and password
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user); // -> Generating token
    res.status(200).json({ token });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
