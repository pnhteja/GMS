import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import needless from "../assets/img/needless.jpg";
import { GRIEVANCE_INFO_PATH, HOME_PATH } from "../routes";

const AllGrievancesPage = () => {
  const grievances = useSelector((state) => state.all.grievances);

  return (
    // <Fragment>
    //   <h1>All Grievances</h1>
    //   <div>
    //     <img src={needless} alt="meme" />
    //   </div>
    //   <ul>
    //     {grievances.map((grievance, index) => (
    //       <li key={index}>
    //         <Link to={GRIEVANCE_INFO_PATH} state={grievance}>
    //           {grievance.title}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    //   <div>
    //     <Link to={HOME_PATH}>Back to Home</Link>
    //   </div>
    // </Fragment>
    <section className="section dashboard">
      <h1>All Grievances</h1>
      <img
        src={needless}
        alt="meme"
        style={{
          height: "300px",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      />
      <div className="'row">
        <div className="col-12">
          <div className="card recent-sales overflow-auto">
            <div className="card-body">
              <h5 className="card-title">
                Recent Grievances <span>| Today</span>
              </h5>

              <table className="table table-borderless datatable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Grievance Title</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grievances.map((grievance, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{grievance.user.name}</td>
                      <td>
                        <Link to={`${GRIEVANCE_INFO_PATH}/${grievance._id}`}>
                          {grievance.title}
                        </Link>
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            grievance.status === "pending"
                              ? "warning"
                              : "success"
                          }`}
                        >
                          {grievance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                    <th scope="row">
                      <a href="#">#2457</a>
                    </th>
                    <td>Brandon Jacob</td>
                    <td>
                      <a
                        href="#"
                        className="text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        At praesentium minu
                      </a>
                    </td>
                    <td>$64</td>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllGrievancesPage;
