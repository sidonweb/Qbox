import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import {User} from "next-auth"
import UserModel from "@/model/User";

export async function DELETE(request: Request, {params}:{params:{messageid: string}}){
    const messageId = params.messageid
    await dbConnect()
    const session = await getServerSession(authOptions)
    const _user: User = session?.user as User
    if(!session || !_user){
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },{status: 401}
        )
    }
    try {
        const updatedResult = await UserModel.updateOne(
            {_id: _user._id},
            {$pull: {messages: {_id: messageId}}}
        )
        if(updatedResult.modifiedCount === 0){
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted"
                },{status: 404}
            )
        }
        return Response.json(
            {
                success: true,
                message: "Message deleted"
            }, {status: 200}
        )
    } catch (error) {
        console.error("Error in delete route", error)
        return Response.json(
            {
                success: false,
                message: "Error deleting message"
            }, {status: 500}
        )
    }
}