import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import complaints from "../assets/img/complaints.jpg";
import {
  HOME_PATH,
  GRIEVANCE_INFO_PATH,
  GRIEVANCE_HANDLE_PATH,
} from "../routes";

const AssignedGrievancesPage = () => {
  const grievances = useSelector((state) => state.assigned.grievances);

  return (
    <section className="section dashboard">
      <h1>Assigned Grievances</h1>
      <img
        src={complaints}
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
                    <th scope="col">Action</th>
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
                      <td>
                        {/* <button type="button" class="btn btn-outline-primary">
                          Handle
                        </button> */}
                        <Link to={`${GRIEVANCE_HANDLE_PATH}/${grievance._id}`}>
                          Handle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignedGrievancesPage;
