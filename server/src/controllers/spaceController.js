import { createSpace, getMySpace, joinSpace } from "../services/spaceService.js";

const createSpaceController = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        const createdSpace = await createSpace(userId, name);

        return res.status(201).json({
            success: true,
            message: "Space created successfully.",
            data: createdSpace
        });
    } catch (error) {
        next(error);
    }
};

const joinSpaceController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { inviteCode } = req.body;

        const joinedSpace = await joinSpace(userId, inviteCode);

        return res.status(200).json({
            success: true,
            message: "Successfully joined the space.",
            data: joinedSpace
        });
    } catch (error) {
        next(error);
    }
};

const getMySpaceController = async (req, res, next) => {
    try {
        const mySpace = await getMySpace(req.user.id);

        return res.status(200).json({
            success: true,
            data: mySpace
        });
    } catch (error) {
        next(error);
    }
};

export {
    createSpaceController,
    joinSpaceController,
    getMySpaceController
};