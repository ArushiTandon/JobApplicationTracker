const bcrypt = require('bcrypt');
const User = require('../model/user');
const { generateToken } = require('../middlewares/jwt');
const sequelize = require('../util/db');

exports.signUp = async (req, res) => {
    
    const {username, email, phone, password} = req.body;
    const t = await sequelize.transaction();

    try {
        const user = await User.findOne({ where: { username } });
      
        if(user) {
            console.log('Username already exists');
            return res.status(200).json({ message: 'Username already exists'});
        }

        const newUser = await User.create({username, email, phone, password});
        await t.commit();
        
        res.status(201).json({userId: newUser.id,
            message: 'ACCOUNT CREATED!',
            redirectUrl: '/user/login',
        })
    } catch (error) {
        await t.rollback();
        console.error('ERROR:', error);
        res.status(400).json({error: 'Error creating user'});
    }
};

exports.login = async(req, res) => {
   
    const {email, password} = req.body;
    
    try {
        
        const user = await User.findOne({ where: { email } });
        // console.log('Found User:', user);

        if (!user) {
            console.log('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // console.log('Login - Stored Hash:', user.password);
        // console.log('Login - Password Match:', await bcrypt.compare(password, user.password));

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password Valid:', isPasswordValid);

        if(!user || !(isPasswordValid)) {
            console.log('Invalid email or password');
            return res.status(401).json({error: 'Invalid email or password'});
        }

        const payload = {
            username: user.username,
            id: user.id,
            email: user.email,
        };

        const token = generateToken(payload);

        return res.status(200).json({
            message: 'Login successful!',
            token: token,
            // redirectUrl: '',
        });

    } catch (error) {
        console.error('error:', error);
        res.status(400).json({error: 'Error logging in'});
    }
}

exports.getUser = async (req, res) => {

    const userId = req.user.id;
    
    try {
        const user = await User.findByPk({ where: { id: userId } });

        res.status(200).json({
            user: user,
            // redirectUrl: '',
        });        

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({message: 'Failed to fetch users'});   
    }
   
  };

exports.updateUser = async (req, res) => {

    const userId = req.user.id;
    const {firstName, lastName, email, phone, location, currentRole, currentCompany, experienceLevel, careerGoals} = req.body;

    try {
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const updateData = { firstName, lastName, email, phone, location, currentRole, currentCompany, experienceLevel, careerGoals };


        await user.update(updateData);

        res.status(200).json({ user: user, message: 'Profile updated successfully!' });
} catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
}
};
  