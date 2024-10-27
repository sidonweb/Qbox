import UserModel from "@/model/User";
// TODO: implement zod import { z } from "zod"
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
    await dbConnect();
    try {
        const {username, code} = await request.json()
        const decodedUsername = decodeURIComponent(username);
        console.log(decodedUsername)

        const user = await UserModel.findOne({username: decodedUsername})
        console.log(user)
        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, { status: 500 }
            ); 
        }
        const isCodeValid = user.VerificationCode === code;
        const isCodeNotExpired = new Date(user.VerificationCodeExpiry) > new Date();
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "Account verified"
                }, { status: 200 }
            );
        } else if(!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code expired, please signup again to get a new code."
                }, { status: 400 }
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Verification code incorrect"
                }, { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error verifyig user"
            }, { status: 500 }
        );  
    }
}