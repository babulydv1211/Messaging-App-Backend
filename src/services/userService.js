import bcrypt from 'bcrypt'
import {  StatusCodes } from "http-status-codes";

import userRepository from "../repositories/userRepository.js";
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService= async (data)=>{  //now is signup sercive ke under hm create repository ko bulayenge
    try{
      const newUser= await userRepository.create(data);
     return newUser;
      }catch(error){
      console.log("error the service",error);

      if(error.name==='validationError'){
       throw new ValidationError({
        error:error.errors
       },error.message);
     
    }

    if(error.name ==="MongoServerError"  && error.code===11000){
          throw new ValidationError ({
            error:['A user with same email or username alreday exist']
          },

          'A user with same email or username already exists'
        );
    }
}

    
}


// signIn logic

export const signInService = async (data) =>{
   try{
      const user = await userRepository.getByEmail(data.email);
      if(!user){
        throw new ClientError({
          explanation:'Invalid data sent from the client',
          message:'No registered user found with this email',
          StatusCodes:StatusCodes.NOT_FOUND
        });
      }
      // match the incoming password  with the hashed password in the database

       const isMatch= bcrypt.compareSync(data.password,user.password);
       if(!isMatch){
        throw new ClientError({
          explanation:'Invalid data sent from the client',
          message:'Invalid password ,please try again',
          getStatusCode:StatusCodes.BAD_REQUEST
        })
       }

       return {
          username:user.username,
          avatar:user.avatar,
          email: user.email,
          token: createJWT({id:user._id,email:user.email})
       }

   }catch(error){
    console.log("user service error",error);
    throw error;
   }
}