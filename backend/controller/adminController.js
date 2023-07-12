const adminCollection= require('../model/adminModel')
const userCollection= require('../model/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


// let data = {
//     username: "mohammed",
//     password: "123456"
//   };
  
//   const signup = async (req, res) => {
//     console.log(data);
  
//     try {
//       await adminCollection.create(data);
//       console.log("Added");
//       res.status(200).send("Added");
//     } catch (error) {
//       console.error("Error during signup:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   };


///<<<<<<<<<<<<<<<<<<<<<<<< ADMIN LOGIN  >>>>>>>>>>>>>>>>>>>>>>>>>>>
const adminLogin =async (req,res)=>{
    try {
        let {username,password}=req.body;
        let admin =  await adminCollection.findOne({username})
        if(admin){
            if(admin.password===password){
            console.log("Logged in successfully");
            const token = jwt.sign({ sub: admin._id }, 'Key', { expiresIn: '3d' })
            res.json({ admin: true, token })
            }else{
             console.log("Invalid Password")
             const error= { username: 'Invalid password' }
             res.json({admin:false,error})
            }
        }else{
            console.log("Username not found")
            res.json({admin:false,error})
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports= {adminLogin}