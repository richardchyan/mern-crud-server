import jwt from 'jsonwebtoken';

const authenticateToken = async(req, res, next) => {

   try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if(token == null) return res.sendStatus(401);

      let decodedToken;

      if(token){
         decodedToken = jwt.verify(token, process.env.ACCESSTOKENKEY);
         req.userId = decodedToken?.id;
         req.email = decodedToken?.email;

         next();
      }
   } catch (error) {
      console.log(error);
   }
}

export default authenticateToken;