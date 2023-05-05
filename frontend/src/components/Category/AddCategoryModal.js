import { useNavigate } from "react-router-dom";
import { ADMIN_HOME_PATH } from "../../routes";
const AddCategoryModal = (props) => {
  const navigate = useNavigate();
  const proceedHandler = async () => {
    const categoryElement = document.querySelector("#addCategory");
    const response = await fetch("/categories/new", {
      method: "POST",
      body: JSON.stringify({
        name: categoryElement.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      navigate(ADMIN_HOME_PATH);
    }
    categoryElement.value = "";
  };

  const cancelHandler = () => {
    const categoryElement = document.querySelector("#addCategory");
    categoryElement.value = "";
  };
  return (
    <div
      className="modal fade"
      id={`${props.id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add new category
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <label htmlFor="addCategory" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="addCategory"
                  name="aaddCategory"
                  aria-label="addCategory"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={cancelHandler}
            >
              No, Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={proceedHandler}
            >
              Yes, Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
