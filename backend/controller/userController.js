const userCollection = require('../model/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');

const userHome = (req,res)=>{
    res.send('user home ')
 console.log("hello iam user home ")
}

const userSignup = async (req, res) => {
    try {
    let { username, phonenumber, email, password } = req.body;
    const checkusername = await userCollection.find({ username: username });
    
    if (checkusername.length > 0) {
      const errors = { username: 'Username already exists' };
      return res.json({ errors, created: false });
    }
  
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\+\d{1,3}-\d{3,14}$/;
    
    if (!usernameRegex.test(username)) {
      const errors = { username: 'Enter a valid username' };
      return res.json({ errors, created: false });
    }
    
    if (!passwordRegex.test(password)) {
      const errors = { password: 'Enter a valid password' };
      return res.json({ errors, created: false });
    }
    
    if (!emailRegex.test(email)) {
      const errors = { email: 'Enter a valid email' };
      return res.json({ errors, created: false });
    }
    
    // Uncomment this block if you want to validate phone number
    /*
    if (!phoneNumberRegex.test(phonenumber)) {
      const errors = { phonenumber: 'Invalid phone number' };
      return res.status(400).json({ errors, created: false });
    }
    */
  
   else{
    password = password ? await bcrypt.hash(password, 10) : null;
    const data = await userCollection.insertMany([{ username, phonenumber, password, email }]);
    res.json({ user: data, created: true });
   }    
    } catch (error) {
      res.json({ error, created: false });
    }
  };
  
  

  //--------User Login Function here --------------------------
const userLogin = async (req,res)=>{
    try{
        console.log("hello iam userlogin")
        const {username,password} = req.body
        const user=await userCollection.findOne({username:username})
        console.log(username);

        if(username===undefined) {
            const errors={username:'username required'}
            res.json({ errors, created: false })
        }

        else if(password===undefined) {
            const errors={username:'Password required'}
            res.json({ errors, created: false })
        }

        else if(user){
            let auth= password ? await bcrypt.compare(password,user.password) : null;
            console.log(auth)
            if(auth){
                const token=jwt.sign({sub:user._id},'Key',{expiresIn:'3d'}) //adding topken here
                console.log(token);
                res.json({login:true,token,user})
            }else{
                const errors={password:"incorrect password"}
                res.json({ errors, created: false })
            }
        }else{
            console.log("error")
            const errors={username:'incorrect username'}
                res.json({ errors, created: false })
        }
    }catch(error){
        console.log(error);
    }
}



module.exports = {userSignup,userLogin,userHome}


