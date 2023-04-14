import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";

import complained from "../assets/img/complained.png";

import { HOME_PATH } from "../routes";

const PostGrievancePage = () => {
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = event.target.email.value;
    const selectedCategory = event.target.category.value;
    const enteredTitle = event.target.title.value;
    const enteredBody = event.target.body.value;

    // console.log(enteredEmail);
    // console.log(selectedCategory);
    // console.log(enteredTitle);
    // console.log(enteredBody);

    const grievanceData = {
      email: enteredEmail,
      category: selectedCategory,
      title: enteredTitle,
      body: enteredBody,
    };

    const response = await fetch("/grievances/new", {
      method: "POST",
      body: JSON.stringify(grievanceData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data = await response.json();
    // console.log(data);
    // navigate("/my");
  };

  return (
    // <Fragment>
    //   <h1>Post Grievance</h1>
    //   <div>
    //     <img src={complained} alt="meme" />
    //   </div>
    //   <form onSubmit={submitHandler}>
    //     {/* <div>
    //     <label htmlFor="name">Name: </label>
    //     <input
    //       type="text"
    //       name="name"
    //       id="name"
    //       required
    //       defaultValue="hello"
    //     />
    //   </div> */}
    //     <div>
    //       <label htmlFor="email">Email: </label>
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         required
    //         defaultValue="hello@gmail.com"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="category-select">Category</label>

    //       <select name="category" id="category-select">
    //         <option value="">--Please choose an option--</option>
    //         <option value="academics">Academics</option>
    //         <option value="mess">Mess</option>
    //         <option value="hostel">Hostel</option>
    //       </select>
    //     </div>
    //     <div>
    //       <label htmlFor="title">Title: </label>
    //       <input
    //         type="text"
    //         name="title"
    //         id="title"
    //         required
    //         defaultValue="eee"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="body">Body: </label>
    //       {/* <input
    //       type="text"

    //     /> */}
    //       <textarea
    //         name="body"
    //         id="body"
    //         rows="10"
    //         cols="50"
    //         required
    //         defaultValue="eee"
    //       ></textarea>
    //     </div>
    //     <button type="submit">Submit</button>
    //   </form>
    // </Fragment>
    <div className="row">
      <div className="col-lg-8">
        <h1 className="card-title">Post Grievance</h1>
        <div>
          <img
            src={complained}
            alt="meme"
            style={{
              height: "200px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          />
        </div>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label htmlFor="inputText" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label"
                >
                  Body
                </label>
                <div className="col-sm-10">
                  <textarea
                    id="body"
                    name="body"
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
                    aria-label="Default select example"
                  >
                    <option defaultValue>Select</option>
                    <option value="academics">Academics</option>
                    <option value="mess">Mess</option>
                    <option value="hostel">Hostel</option>
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
