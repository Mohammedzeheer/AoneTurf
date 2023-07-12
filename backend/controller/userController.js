const userCollection = require('../model/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');

const userHome = (req,res)=>{
    res.send('user home ')
 console.log("hello iam user home ")
}

const userSignup = async (req, res) => {
    // const data = req.body;
    let { username, phonenumber, email,password } = req.body;
    const checkusername = await userCollection.find();
    console.log(checkusername);
    // for (const document of checkusername) {
    //   console.log(document.username);
    // }
    // Regex patterns
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Allows alphanumeric characters and underscores, length between 3 and 20.
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Requires at least one lowercase letter, one uppercase letter, one digit, and length of 8 or more.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation.
    const phoneNumberRegex = /^\+\d{1,3}-\d{3,14}$/; // Allows a plus sign followed by country code and phone number with hyphen.
    
    if(checkusername.username==username){
        const error={}
        error.username='username already exits'
        return res.status(400).json({ error, created: false  }); 
    }

   else if (!usernameRegex.test(username)) {
        const error={}
        error.username='enter a valid username'
        return res.status(400).json({ error, created: false  });
    }
    else if (!passwordRegex.test(password)) {
        const error={}
        error.password='enter a valid password'
      return res.status(400).json({ error,created: false });
    }
  
    else if (!emailRegex.test(email)) {
        const error={}
        error.email='enter a valid email'
      return res.status(400).json({ error,created: false });
    }
  
    //else if (!phoneNumberRegex.test(phonenumber)) {
    //     const error={}
    //     error.phonenumber=' Invalid phone number'    
    //   return res.status(400).json({ error,created: false });
    // }
    
    // Validation passed, proceed with saving the user
    else{
        password =  password ?  await bcrypt.hash(password, 10) :null; 
        console.log(password)
        const data= await userCollection.insertMany([{ username,phonenumber,password, email}])
        // const user = await userCollection.create(data);
        res.status(200).json({ user:data, created: true });
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


