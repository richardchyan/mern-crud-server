import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signin = async (req, res) => {

   const { email, password } = req.body;

   try {
      
      const existingUser = await User.findOne({ email });

      if(!existingUser) return res.status(400).json({ message:' That user does not exist. Please sign up for an account!'});

      // Use bcrypt to compare hash and inputted password
      // A simple if statement can't check because password is hashed

      const passwordCheck = await bcrypt.compare(password, existingUser.password);

      if(!passwordCheck) return res.status(400).json({message: 'Your credentials do not match. Please try again.'})

      // Create a token that contains user info

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.ACCESSTOKENKEY, {expiresIn: '1h'});
      
      //Send the user and token back as a response
      res.status(200).json({ profile: existingUser, token});

   } catch (error) {
      console.log(error);
      res.status(400).json({message: 'Error, please try again.'})
   }
   
}

export const signup = async (req, res) => {

   const { firstName, lastName, email, password, confirmPassword } = req.body;
   
   console.log(req.body);

   try {
      
      const existingUser = await User.findOne({ email });

      if(existingUser) return res.status(400).json({ message: 'User with that email already exists!'});

      if(password.length < 6){
         return res.status(400).json({ message: 'Passwords must be at least 6 characters long'})
      } else if (password.length > 20){
         return res.status(400).json({ message: 'Password is too long. Passwords must be 20 characters or less'})
      }

      if(password !== confirmPassword){
         return res.status(400).json({ message: 'The passwords do not match. Please try again'});
      }
      
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

      // Create jwt token 

      const token = jwt.sign({ email: newUser.email, id: newUser._id}, process.env.ACCESSTOKENKEY, { expiresIn: '1h'});

      // Then send BOTH the newUser AND the token as a respoonse
      res.status(200).json({ profile: newUser, token });

   } catch (error) {
      console.log(error);
      res.status(400).json({message: 'There was an error. Please try again'})
   }

}

