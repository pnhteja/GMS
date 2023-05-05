const Grievance = require("../models/grievance");
const Upvote = require("../models/upvote");
const Downvote = require("../models/downvote");

const {
  getVoteStatus,
  upVote,
  downVote,
  undoUpVote,
  undoDownVote,
} = require("./vote");

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockRequest = () => {
  return {
    body: {
      userId: "1",
      grievanceId: "2",
    },
  };
};

const mockGrievance = {
  upvotesCount: 0,
  downvotesCount: 0,
  save: jest.fn().mockResolvedValueOnce(null),
};

const mockErrorMsg = "Failed";

describe("Test vote controller getVoteStatus", () => {
  it("sends no vote status", async () => {
    jest.spyOn(Upvote, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(Downvote, "findOne").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await getVoteStatus(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      upvoted: false,
      downvoted: false,
    });
  });

  it("sends upvote status", async () => {
    jest.spyOn(Upvote, "findOne").mockResolvedValueOnce({});
    jest.spyOn(Downvote, "findOne").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await getVoteStatus(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      upvoted: true,
      downvoted: false,
    });
  });

  it("sends downvote status", async () => {
    jest.spyOn(Upvote, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(Downvote, "findOne").mockResolvedValueOnce({});
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await getVoteStatus(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      upvoted: false,
      downvoted: true,
    });
  });

  it("should fail sending status", async () => {
    jest.spyOn(Upvote, "findOne").mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Downvote, "findOne").mockResolvedValueOnce({});
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await getVoteStatus(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test vote controller upVote", () => {
  it("should record user's upvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockResolvedValueOnce(mockGrievance);
    jest.spyOn(Upvote.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await upVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to record user's upvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Upvote.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await upVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test vote controller downVote", () => {
  it("should record user's upvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockResolvedValueOnce(mockGrievance);
    jest.spyOn(Downvote.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await downVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to record user's downvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Downvote.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await downVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test vote controller undoUpVote", () => {
  it("should remove user's upvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockResolvedValueOnce(mockGrievance);
    jest.spyOn(Grievance.prototype, "save").mockResolvedValueOnce(null);
    jest.spyOn(Upvote, "findOneAndDelete").mockResolvedValueOnce(mockGrievance);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await undoUpVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to remove user's upvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Grievance.prototype, "save").mockResolvedValueOnce(null);
    jest.spyOn(Upvote, "findOneAndDelete").mockResolvedValueOnce(mockGrievance);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await undoUpVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test vote controller undoDownVote", () => {
  it("should remove user's downvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockResolvedValueOnce(mockGrievance);
    jest.spyOn(Grievance.prototype, "save").mockResolvedValueOnce(null);
    jest
      .spyOn(Downvote, "findOneAndDelete")
      .mockResolvedValueOnce(mockGrievance);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await undoDownVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to remove user's downvote for the grievance", async () => {
    jest.spyOn(Grievance, "findById").mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Grievance.prototype, "save").mockResolvedValueOnce(null);
    jest
      .spyOn(Downvote, "findOneAndDelete")
      .mockResolvedValueOnce(mockGrievance);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await undoDownVote(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
