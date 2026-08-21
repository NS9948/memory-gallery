import mongoose from "mongoose";
import SpaceMember from "../models/SpaceMember.js";
import Space from "../models/SpaceModel.js";

const generateInviteCode = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * characters.length);
        code += characters[index];
    }

    return code;
};

const generateUniqueInviteCode = async () => {
    let inviteCode;

    while (true) {
        inviteCode = generateInviteCode();

        const existingSpace = await Space.findOne({
            inviteCode
        });

        if (!existingSpace) {
            return inviteCode;
        }
    }
};

const createSpace = async (userId, name) => {
    const existingMembership = await SpaceMember.findOne({
        user: userId
    });

    if (existingMembership) {
        const error = new Error("User already belongs to a Space");
        error.statusCode = 409;
        throw error;
    }

    const inviteCode = await generateUniqueInviteCode();
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const spaces = await Space.create(
            [{
                name,
                inviteCode,
                createdBy: userId
            }],
            { session }
        );

        const createdSpace = spaces[0];

        await SpaceMember.create(
            [{
                space: createdSpace._id,
                user: userId,
                role: "OWNER"
            }],
            { session }
        );

        await session.commitTransaction();

        return createdSpace;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const joinSpace = async (userId, inviteCode) => {
    const existingMembership = await SpaceMember.findOne({
        user: userId
    });

    if (existingMembership) {
        const error = new Error("Member already belongs to a Space");
        error.statusCode = 409;
        throw error;
    }

    const space = await Space.findOne({
        inviteCode
    });

    if (!space) {
        const error = new Error("Invalid invite code");
        error.statusCode = 404;
        throw error;
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        await SpaceMember.create(
            [{
                space: space._id,
                user: userId,
                role: "MEMBER"
            }],
            { session }
        );

        const memberCount = await SpaceMember.countDocuments({
            space: space._id
        }).session(session);

        let updatedSpace = space;

        if (memberCount >= 2) {
            updatedSpace = await Space.findByIdAndUpdate(
                space._id,
                {
                    status: "ACTIVE"
                },
                {
                    new: true,
                    session
                }
            );
        }

        await session.commitTransaction();

        return updatedSpace;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

const getMySpace = async (userId) => {
    const membership = await SpaceMember.findOne({
        user: userId
    });

    if (!membership) {
        return null;
    }

    const space = await Space.findById(membership.space);

    return space;
};

export {
    createSpace,
    joinSpace,
    getMySpace
};