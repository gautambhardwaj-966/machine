export const checkValidData=(email,password)=>{
                    ///^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

if(!isEmailValid) return "Email Id Is Not Valid";
if(!isPasswordValid) return "Password is not Valid";

return null;

};