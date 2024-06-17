import { db } from "@/lib/db";

export const getPasswordResetTokenByToken= async (token: string)=>{
    try {
        const passwordResetToken= await db.passwordResetToken.findFirst({
            where: {
                token
            }
        })
        return passwordResetToken;
    } catch (error) {
        return null;
    }
}
export const getPasswordResetTokenByEmail= async (email: string)=>{
    try {
        const passwordResetToken= await db.passwordResetToken.findFirst({
            where: {
                email
            }
        })
        console.log("find_token_data ", passwordResetToken);
        
        return passwordResetToken;
    } catch (error) {
        return null;
    }
}