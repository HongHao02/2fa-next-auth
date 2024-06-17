import { db } from "@/lib/db";

export const getVerificationTokenByEmail= async (email: string)=>{
    try {
        const verificationToken= await db.verificationToken.findFirst({
            where: {
                email
            }
        })
        return verificationToken;
    } catch (error) {
        return null;
    }
}
export const getVerificationTokenByToken= async (token: string)=>{
    try {
        const verificationToken= await db.verificationToken.findUnique({
            where: {
                token
            }
        })
        console.log("[data-verification_token] ",verificationToken);
        return verificationToken;
    } catch (error) {
        console.log("[data-verification_token] ", error);
        return null;
    }
}