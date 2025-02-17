import { UserCreatePayload, UserEntity, UserQuery } from "@/domain/entities/userEntity";
import { Document, Schema, model } from "mongoose";

export interface IUserDocument extends Document {
    _id: string,
    userName: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    age: number,
    gender: string,
    height: number,
    weight: number,
    skinColor: string,
    bodyShape: string,
    healthCase: string,
    smoking: boolean,
    prayer: boolean,
    religiousCommitment: boolean,
    maritalStatus: string,
    marriageType: string,
    children: number,
    educationalQualification: string,
    jobCategory: string,
    job: string,
    monthlyIncome: number,
    financialStatus: string,
    nationality: string,
    city: string,
    country: string,
    aboutYourSelf: string,
    aboutYourPartner: string,
    beard?: string,
    viel?: string,
    location: {
        type: string,
        coordinates: number[]
    },
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean,
    isBanned: boolean,
}


const genderEnum = ['Male', 'Female']

// TODO: define allowed skin colors enum later

const userSchema = new Schema<IUserDocument>(
    {
        userName: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: false },   // optional
        age: { type: Number, required: true },
        gender: { type: String, required: true, enum: genderEnum },
        height: { type: Number, required: true, min: 0 },
        weight: { type: Number, required: true, min: 0 },
        skinColor: { type: String, required: true },
        bodyShape: { type: String, required: true },
        healthCase: { type: String, required: true },
        smoking: { type: Boolean, required: true },
        prayer: { type: Boolean, required: true },
        religiousCommitment: { type: Boolean, required: true },
        maritalStatus: { type: String, required: true },
        marriageType: { type: String, required: true },
        children: { type: Number, required: true },
        educationalQualification: { type: String, required: true },
        jobCategory: { type: String, required: true },
        job: { type: String, required: true },
        monthlyIncome: { type: Number, required: true },
        financialStatus: { type: String, required: true },
        nationality: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        aboutYourSelf: { type: String, required: true },
        aboutYourPartner: { type: String, required: true },
        beard: { type: String, required: false },
        viel: { type: String, required: false },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: false
            },
            coordinates: {
                type: [Number],
                required: false
            },
        },
        isDeleted: { type: Boolean, required: false, default: false },
        isBanned: { type: Boolean, required: false, default: false },
    },
    { timestamps: true }
)

// create 2dsphere index for location field
userSchema.index({ location: "2dsphere" })

// create text index for full text search
userSchema.index({ fullName: "text", aboutYourSelf: "text", aboutYourPartner: "text" })


// Mapper
export const UserMapper = {

    toCreateUserDTO: (userCreatePayload: UserCreatePayload) => {
        const { ...dto } = userCreatePayload;
        return dto;
    },

    toEntity: (userDocument: IUserDocument): UserEntity => {
        const { _id, ...entity } = userDocument.toObject();

        return new UserEntity({
            id: _id,
            ...entity,
        })
    },

    toQuery: (query: UserQuery) => {
        return {
            ...(query.userName && { userName: query.userName }),
            ...(query.fullName && { fullName: query.fullName }),
            ...(query.email && { email: query.email }),
            // TODO: add more fields to query
        }
    }
}


export default model<IUserDocument>("User", userSchema)