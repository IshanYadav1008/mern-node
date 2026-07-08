const User          = require ('../models/User');
const generateToken = require('../utils/generateToken');


exports.createAdmin = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const newAdmin = new User({
      name,
      email,
      username,
      password,
      role: 'admin'
    });

    const savedAdmin = await newAdmin.save(); 
    const token = generateToken({ id: savedAdmin._id, role: savedAdmin.role });
    res.status(200).json({ response: savedAdmin, token: token, message: 'Admin created' });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body; 

    const newUser = new User({
      name,
      email,
      username,
      password,
      role: 'user' 
    });

    const savedUser = await newUser.save();

    // ✅ token generate karo
    const token = generateToken({ id: savedUser._id, role: savedUser.role });

    res.status(200).json({ 
      response: savedUser, 
      token: token, 
      message: 'Signup successful' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: 'User not found' });
    
    // After using bcrypt
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = generateToken({ id: user._id, role: user.role });

    // Role response mein bhejo
    res.status(200).json({
      message: 'Login successful',
      role: user.role,        // ← frontend ko pata chalega
      token: token
    });

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
    try{
        const data = await User.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
};

exports.getUserProfile = async (req, res) => {
  try{
    
    const user = await User.findById(req.user.id).select('-password')

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({user});
  }
  catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' })
  }
};

// ✅ Fix — pehle find karo, phir save karo
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user   = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Jo bhi fields aayi hain update karo
    const { name, email, username, password } = req.body;
    if (name)     user.name     = name;
    if (email)    user.email    = email;
    if (username) user.username = username;
    if (password) user.password = password; // pre('save') hook chalega ✅

    const updatedUser = await user.save(); // ab hook chalega

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try{
      const userId = req.params.id

      // ✅ Admin apne aap ko is route se delete na kare
      if (userId === req.user.id) {
        return res.status(400).json({ 
          error: 'Cannot delete your own account from here.' 
        })
      }

      const response = await User.findByIdAndDelete(userId)

      if(!response) {
          return res.status(404).json({ error: 'User not found' });
      }
      console.log('user deleted');
      res.status(200).json({message: 'user deleted successfully'})
  }
  catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'})
  }
};

exports.deleteOwnAccount = async (req, res) => {
  try {
    const userId = req.user.id   // ← URL params se NAHI, token se aa raha hai

    const response = await User.findByIdAndDelete(userId)

    if (!response) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('user deleted own account');
    res.status(200).json({ message: 'Your account was deleted successfully' })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
};