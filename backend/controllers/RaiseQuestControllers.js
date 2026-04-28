import RaiseQuestModel from "../models/RaiseQuestModel.js";
import UserModel from "../models/userModel.js";
import fs from "fs";

const addRequest = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      peopleAffected,
      volunteersNeeded,
      urgency,
      location,
    } = req.body;

    let imageFilename = "";

    if (req.file) {
      imageFilename = req.file.filename;
    }

    const newAlert = new RaiseQuestModel({
      title: title,
      description: description,
      category: category,
      peopleAffected: peopleAffected,
      volunteersNeeded: volunteersNeeded || 0,
      urgency: urgency,
      location: location,
      image: imageFilename,
    });

    await newAlert.save();
    res.json({ success: true, message: "Alert created successfully" });
  } catch (error) {
    console.log("Error saving alert:", error);
    res.json({ success: false, message: "Error saving alert to database" });
  }
};

const UpdateRequest = async (req, res) => {
  const userId = req.userId;
  try {
    const data = await RaiseQuestModel.findOneAndUpdate(
      { userId: userId },
      { $set: { Status: "Request Completed!!" } },
    );
    if (!data) {
      res.json({ success: false, message: "Kindly Refresh!" });
    }
    res.json({ success: true, message: "Status Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const AcceptRequest = async (req, res) => {
  const userId = req.body.userId || req.userId;
  const id = req.body.id;

  if (!userId) {
    return res.json({
      success: false,
      message: "Authentication failed. User ID not found.",
    });
  }

  try {
    const alreadyAccepted = await UserModel.exists({
      _id: userId,
      [`Accepted_request.${id}`]: { $exists: true },
    });

    if (alreadyAccepted) {
      return res.json({
        success: false,
        message: "You have already accepted this request.",
      });
    }

    const request = await RaiseQuestModel.findOneAndUpdate(
      { _id: id, volunteersNeeded: { $gt: 0 } },
      { $inc: { volunteersNeeded: -1 } },
      { new: true },
    );

    if (!request) {
      return res.json({
        success: false,
        message: "You can't accept this request. No more volunteers required.",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { [`Accepted_request.${id}`]: { acceptedAt: new Date() } } },
      { new: true },
    );

    res.json({
      success: true,
      message: "Request accepted successfully!",
      remainingVolunteers: request.volunteersNeeded,
      acceptedRequests: updatedUser.Accepted_request,
    });
  } catch (error) {
    console.log("Error in AcceptRequest:", error);
    res.json({ success: false, message: "Server error" });
  }
};

const GetAllRequest = async (req, res) => {
  const location = req.query.location;
  try {
    let filter = {};
    if (location && location.trim() !== "") {
      filter.location = { $regex: location, $options: "i" };
    }

    const allRequests = await RaiseQuestModel.find(filter).sort({
      createdAt: -1,
    });

    if (!allRequests || allRequests.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No requests found for this location.",
        });
    }

    res.status(200).json({ success: true, data: allRequests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving requests." });
  }
};

const GetMyAcceptedRequests = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await UserModel.findById(userId, "Accepted_request");
    if (!user) return res.json({ success: false, message: "User not found" });

    const acceptedRequestsObj = user.Accepted_request || {};
    const requestIds = Object.keys(acceptedRequestsObj);

    if (requestIds.length === 0) return res.json({ success: true, data: [] });

    const requests = await RaiseQuestModel.find({ _id: { $in: requestIds } });

    const sortedRequests = requests
      .map((reqData) => ({
        ...reqData._doc,
        acceptedAt: acceptedRequestsObj[reqData._id]?.acceptedAt,
      }))
      .sort((a, b) => new Date(b.acceptedAt) - new Date(a.acceptedAt));

    res.json({
      success: true,
      count: sortedRequests.length,
      data: sortedRequests,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching accepted requests" });
  }
};

const resolveRequest = async (req, res) => {
  try {
    const { id } = req.body;

    await RaiseQuestModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Mission Accomplished! Alert resolved.",
    });
  } catch (error) {
    console.log("Error resolving:", error);
    res.json({ success: false, message: "Error resolving alert" });
  }
};

export {
  addRequest,
  GetAllRequest,
  AcceptRequest,
  GetMyAcceptedRequests,
  resolveRequest,
};
