import bcrypt from "bcrypt"

const saltCount=10;
export function hashConvert(pass){
    const salt=bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass,salt);
}

export function hashCompare(oldPass,newPass)
{
    return bcrypt.compareSync(newPass,oldPass)
}