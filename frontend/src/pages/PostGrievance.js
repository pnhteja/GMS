import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import { HOME_PATH } from "../routes";

const PostGrievancePage = () => {
  const userEmail = useSelector((state) => state.auth.email);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const selectedCategory = event.target.category.value;
    const enteredTitle = event.target.title.value;
    const enteredBody = event.target.body.value;
    const providedVisibility = event.target.visibility.value;

    const grievanceData = {
      email: userEmail,
      category: selectedCategory,
      title: enteredTitle,
      body: enteredBody,
      visibility: providedVisibility,
    };

    const response = await fetch("/grievances/new", {
      method: "POST",
      body: JSON.stringify(grievanceData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    navigate(HOME_PATH);
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="card-title" style={{ marginBottom: "25px" }}>
          Post Grievance
        </h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    aria-label="title"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="body" className="col-sm-2 col-form-label">
                  Body
                </label>
                <div className="col-sm-10">
                  <textarea
                    id="body"
                    name="body"
                    aria-label="body"
                    className="form-control"
                    style={{ height: "100px" }}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-10">
                  <select
                    name="category"
                    className="form-select"
                    aria-label="category"
                  >
                    <option defaultValue>Select</option>
                    <option value="academics">Academics</option>
                    <option value="mess">Mess</option>
                    <option value="hostel">Hostel</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Visibility</label>
                <div className="col-sm-10">
                  <select
                    name="visibility"
                    className="form-select"
                    aria-label="visibility"
                  >
                    <option defaultValue>Select</option>
                    <option value="public">public</option>
                    <option value="private">private</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                {/* <label className="col-sm-2 col-form-label">Submit Button</label> */}
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGrievancePage;
