const User = require("../models/user");
const Grievance = require("../models/grievance");
const Upvote = require("../models/upvote");
const Downvote = require("../models/downvote");
const Comment = require("../models/comment");
const {
  getGrievanceInfo,
  handleGrievance,
  escalateGrievance,
  deleteGrievance,
} = require("../controllers/grievance");
// const sendMail = require("../email/sender");

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockErrorMsg = "Failed";

jest.mock("../email/sender.js", () => {
  return {
    sendMail: jest.fn(() => null),
  };
});

jest.mock("../email/mailFormats", () => {
  return {
    getStatusChangeMailBody: jest.fn(() => null),
    getStatusChangeMailSubject: jest.fn(() => null),
    getEscalationMailBody: jest.fn(() => null),
    getEscalationMailSubject: jest.fn(() => null),
  };
});

describe("Test grievance controller getGrievanceInfo", () => {
  const mockRequest = () => {
    return {
      params: {
        grievanceId: "1111",
      },
    };
  };

  it("should send grievance info successfully", async () => {
    jest.spyOn(Grievance, "findOne").mockImplementationOnce(() => ({
      populate: () => ({
        populate: jest.fn().mockResolvedValueOnce({}),
      }),
    }));
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await getGrievanceInfo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to fetch grievance info", async () => {
    jest.spyOn(Grievance, "findOne").mockImplementationOnce(() => ({
      populate: () => ({
        populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
      }),
    }));
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await getGrievanceInfo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test grievance controller handleGrievance", () => {
  it("should update status and mail stakeholders", async () => {
    const mockRequest = () => {
      return {
        body: {
          userId: "1",
          grievanceId: "2",
        },
      };
    };

    const mockGrievance = {
      category: "fake",
      title: "fake",
      body: "fake",
      status: "fake",
      save: jest.fn().mockResolvedValueOnce(null),
      user: {
        name: "fake",
      },
    };
    jest.spyOn(Grievance, "findOne").mockImplementationOnce(() => ({
      populate: jest.fn().mockResolvedValueOnce(mockGrievance),
    }));
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await handleGrievance(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
  }, 10000);

  it("fails to update status and mail stakeholders", async () => {
    const mockRequest = () => {
      return {
        body: {
          userId: "1",
          grievanceId: "2",
        },
      };
    };

    const mockGrievance = {
      category: "fake",
      title: "fake",
      body: "fake",
      status: "fake",
      save: jest.fn().mockResolvedValueOnce(null),
      user: {
        name: "fake",
      },
    };
    jest.spyOn(Grievance, "findOne").mockImplementationOnce(() => ({
      populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
    }));
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await handleGrievance(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  }, 10000);
});

describe("Test grievance controller deleteGrievance", () => {
  it("should delete grievance successfully", async () => {
    const mockRequest = () => {
      return {
        body: {
          grievanceId: "2",
        },
      };
    };

    jest.spyOn(Grievance, "findOneAndDelete").mockResolvedValueOnce(null);
    jest.spyOn(Comment, "deleteMany").mockResolvedValueOnce(null);
    jest.spyOn(Upvote, "deleteMany").mockResolvedValueOnce(null);
    jest.spyOn(Downvote, "deleteMany").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await deleteGrievance(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to delete delete grievance", async () => {
    const mockRequest = () => {
      return {
        body: {
          grievanceId: "2",
        },
      };
    };

    jest
      .spyOn(Grievance, "findOneAndDelete")
      .mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Comment, "deleteMany").mockResolvedValueOnce(null);
    jest.spyOn(Upvote, "deleteMany").mockResolvedValueOnce(null);
    jest.spyOn(Downvote, "deleteMany").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await deleteGrievance(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
