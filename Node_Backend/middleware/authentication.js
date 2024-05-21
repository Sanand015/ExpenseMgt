const {validateToken} =require('./tokengenerator')

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
   let tokenCookieValue;
    
    if(req.body.token){
         tokenCookieValue = req.body.token;
    }
    else{
         tokenCookieValue=req.headers.token;
    }
    if (!tokenCookieValue) {
        req.user=null;
        return next();
    }
    else{   
        try {  
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      
    } catch (error) {}
}

   return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
