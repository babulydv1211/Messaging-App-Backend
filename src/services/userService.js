import userRepository from "../repositories/userRepository.js"
import ValidationError from "../utils/errors/validationErrors.js";

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