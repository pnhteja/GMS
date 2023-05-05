const { validateAuthInfo } = require("./auth");
const User = require("../models/user");

const mockRequest = () => {
  return {
    body: {
      email: "bond@gmail.com",
    },
  };
};

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockUser = {
  _id: "007",
  name: "james",
  email: "bond@gmail.com",
};

describe("Test auth controller validateAuthInfo", () => {
  it("should successfully authenticate", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(mockUser);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await validateAuthInfo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("should fail authentication", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await validateAuthInfo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(401);
  });
});
