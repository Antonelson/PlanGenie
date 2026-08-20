import { checkSchema } from "express-validator";

const user_val=checkSchema({
     
        gmail:{
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"Enter Valid Gmail"
        },
        notEmpty:{
            errorMessage:"Mail should not be empty"
        }
    },
    password:{
        trim:true,notEmpty:{
            errorMessage:"Password should not be empty"
        }
        
    }
})

export default user_val;