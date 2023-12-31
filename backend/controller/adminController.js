const adminCollection= require('../model/adminModel')
const userCollection= require('../model/userModel')
const partnerCollection = require('../model/partnerModel')
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
            res.json({ admin:true, token })
            }else{
             console.log("Invalid Password")
             const errors= { username: 'Invalid password' }
             res.json({errors,admin:false})
            }
        }else{
            console.log("Username not found")
            const errors = {username:'Username not found'}
            res.json({errors,admin:false})
        }

    } catch (error) {
        console.log(error)
    }
}


const userList = async (req,res)=>{
    console.log("hello iam user data .......-------")
    const data=await userCollection.find({})
    console.log(data,"user data  ahsddgd")
    if(data){
        res.json({data})
    }else{
        return res.status(404).json({ message: "Users are  not found" })
    }
}

const partnerList = async (req,res)=>{
  console.log("hello iam user data .......-------")
  const data=await partnerCollection.find({})
  console.log(data,"user data  ahsddgd")
  if(data){
      res.json({data})
  }else{
      return res.status(404).json({ message: "Users are  not found" })
  }
}


// ///BLOCKING USER BY ADMIN  
// const blockUser=async (req,res)=>{
//  try{
//     const userData = await userCollection.findOne({_id:req.params.id})
//     if(userData){
//        const data=await userCollection.updateOne({_id:userData.id},{$set:{status:true}})
//        if(data){
//         res.json({data})
//     }else{
//         return res.status(404).json({ message: "Users are  not found" })
//     }
//     }
//  }catch(error){
//     console.log(error)
//  }
// }



const blockUser = async (req, res) => {
    try {
      console.log("hello ia block user -----------ddfdfdd")
      const {userId}=req.body
      const userData = await userCollection.findOne({ _id: userId});
      console.log(userData,"hello ia block user -----------ddfdfdd")
      if (userData) {
        const data = await userCollection.updateOne(
          { _id: userData._id },
          { $set: { isBlock: true } }
        );
        if (data.modifiedCount > 0) {
          return res.json({ data, message: "User blocked successfully" });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const UnBlockUser = async (req, res) => {
    try {
      console.log("hello ia unblock user -----------ddfdfdd")
      const {userId}=req.body
      const userData = await userCollection.findOne({ _id: userId});
      console.log(userData,"hello ia unblock user -----------ddfdfdd")
      if (userData) {
        const data = await userCollection.updateOne(
          { _id: userData._id },
          { $set: { isBlock: false } }
        );
        if (data.modifiedCount > 0) {
          return res.json({ data, message: "User blocked successfully" });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports= {adminLogin ,userList ,blockUser,UnBlockUser,partnerList}