const User = require("../models/user");
const Grievance = require("../models/grievance");

const {
  fetchAllGrievances,
  fetchMyGrievances,
  fetchAssignedGrievances,
  postGrievance,
} = require("./grievances");

jest.mock("../escalation.js", () => {
  return {
    getHandlerEmail: jest.fn(() => ({ email: "fake" })),
  };
});

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockErrorMsg = "Failed";
const mockGrievances = {};

describe("Test grievances controller fetchAllGrievances", () => {
  const mockRequest = () => {
    return {};
  };

  it("should successfully send all the grievances", async () => {
    jest.spyOn(Grievance, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockResolvedValueOnce(mockGrievances),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchAllGrievances(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to fetch the grievances", async () => {
    jest.spyOn(Grievance, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchAllGrievances(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test grievances controller fetchMyGrievances", () => {
  const mockRequest = () => {
    return {
      params: {
        userId: "1111",
      },
    };
  };

  it("should successfully send user's grievances", async () => {
    jest.spyOn(Grievance, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockResolvedValueOnce(mockGrievances),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchMyGrievances(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to fetch user's grievances", async () => {
    jest.spyOn(Grievance, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchMyGrievances(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test grievances controller fetchAssignedGrievances", () => {
  const mockRequest = () => {
    return {
      params: {
        userId: "1111",
      },
    };
  };

  it("should successfully send user's assigned grievances", async () => {
    jest.spyOn(Grievance, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockResolvedValueOnce(mockGrievances),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchAssignedGrievances(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it("fails to fetch user's assigned grievances", async () => {
    jest.spyOn(Grievance, "find").mockImplementationOnce(() => ({
      sort: () => ({
        populate: jest.fn().mockRejectedValueOnce(mockErrorMsg),
      }),
    }));

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await fetchAssignedGrievances(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Test grievances controller postGrievance", () => {
  const mockRequest = () => {
    return {
      body: {
        email: "fake",
        category: "fake",
        title: "fake",
        body: "fake",
      },
    };
  };

  it("should successfully record the posted grievance", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue({});
    jest.spyOn(Grievance.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await postGrievance(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
  });

  it("fails to record the posted grievance", async () => {
    jest.spyOn(User, "findOne").mockRejectedValueOnce(mockErrorMsg);
    jest.spyOn(Grievance.prototype, "save").mockResolvedValueOnce(null);
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const response = await postGrievance(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
