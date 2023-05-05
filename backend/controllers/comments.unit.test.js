const {
  fetchAllComments,
  fetchMyComments,
  postMyComment,
  deleteMyComment,
} = require("./comments");
const Comment = require("../models/comment");

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockComments = [
  {
    user: {
      name: "Sir Francis Walsingham",
      email: "Sir_Francis_Walsingham@gmail.com",
    },
    text: "Perhaps there is nothing in this universe but ourselves.",
    updatedAt: "2016-05-18T16:00:00Z",
  },
];

const mockErrorMsg = "Failed";

describe("Test comments controller fetchAllComments", () => {
  const mockRequest = () => {
    return {
      params: {
        grievanceId: "1111",
      },
    };
  };

  it("should successfully send the comments", async () => {
    jest.spyOn(Comment, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockResolvedValueOnce(mockComments),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchAllComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to fetch the comments", async () => {
    jest.spyOn(Comment, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchAllComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test comments controller fetchMyComments", () => {
  const mockRequest = () => {
    return {
      body: {
        userId: "1",
        grievanceId: "2",
      },
    };
  };
  it("should successfully send the comments", async () => {
    jest.spyOn(Comment, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockResolvedValueOnce(mockComments),
      }),
    }));
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchMyComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
  it("fails to fetch the comments", async () => {
    jest.spyOn(Comment, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
      }),
    }));
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchMyComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test comments controller postMyComment", () => {
  const mockRequest = () => {
    return {
      body: {
        userId: "1",
        grievanceId: "2",
        text: "fake",
      },
    };
  };
  it("should successfully save the comment", async () => {
    jest.spyOn(Comment.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await postMyComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
  it("fails to save the comment", async () => {
    jest.spyOn(Comment.prototype, "save").mockRejectedValueOnce(mockErrorMsg);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await postMyComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test comments controller deleteMyComment", () => {
  const mockRequest = () => {
    return {
      body: {
        userId: "1",
        grievanceId: "2",
      },
    };
  };
  it("should successfully delete the comment", async () => {
    jest.spyOn(Comment, "findOneAndDelete").mockResolvedValueOnce(mockComments);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await deleteMyComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
  it("fails to delete the comment", async () => {
    jest.spyOn(Comment, "findOneAndDelete").mockRejectedValueOnce(mockErrorMsg);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await deleteMyComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
