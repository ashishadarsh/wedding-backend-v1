import jwt from 'jsonwebtoken';
import { getUserByEmail, saveUserInDB } from './mongodb.js';

const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

export async function authMiddleware(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  let token; // Define token variable here

  // If the Authorization header is present and contains a token
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    // Extract the token (assuming it's in the "Bearer" format)
    token = authorizationHeader.slice(7); // Removes "Bearer " prefix
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.auth = decoded;
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('JWT Verification Error:', error); // Log the error for debugging
    return res.status(401).json({ message: 'Unauthorized' });
  }
}


export async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    res.sendStatus(401);
  } else {
    const { email, _id } = user;
    const claims = { sub: user._id, email: user.email };
    const idToken = jwt.sign(claims, secret);
    res.status(201).json({ email, _id, idToken });
  }
}

export async function handleSignUp(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await saveUserInDB({ email, password });

    if (result) {
      const { email, _id } = result;
      const claims = { sub: result._id, email: result.email };
      const idToken = jwt.sign(claims, secret);
      res.status(201).json({ email, _id, idToken });
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with an error status and message
  }
}
