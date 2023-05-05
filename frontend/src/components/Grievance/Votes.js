import { useEffect, useReducer } from "react";

const initialState = {
  upvoted: false,
  downvoted: false,
  errorMsg: null,
  upvotesCount: 0,
  downvotesCount: 0,
};

const voteReducer = (state, action) => {
  switch (action.type) {
    case "UPVOTE":
      return {
        upvoted: true,
        downvoted: false,
        errorMsg: null,
        upvotesCount: state.upvotesCount + 1,
        downvotesCount: state.downvotesCount,
      };

    case "DOWNVOTE":
      return {
        upvoted: false,
        downvoted: true,
        errorMsg: null,
        upvotesCount: state.upvotesCount,
        downvotesCount: state.downvotesCount + 1,
      };

    case "UNDO_UPVOTE":
      return {
        upvoted: false,
        downvoted: false,
        errorMsg: null,
        upvotesCount: state.upvotesCount - 1,
        downvotesCount: state.downvotesCount,
      };

    case "UNDO_DOWNVOTE":
      return {
        upvoted: false,
        downvoted: false,
        errorMsg: null,
        upvotesCount: state.upvotesCount,
        downvotesCount: state.downvotesCount - 1,
      };

    case "CANNOT_UPVOTE":
      return {
        ...state,
        errorMsg: "Already downvoted... undo it to upvote.",
      };

    case "CANNOT_DOWNVOTE":
      return {
        ...state,
        errorMsg: "Already upvoted... undo it to downvote.",
      };

    case "SET_DATA":
      return action.payload;

    default:
      return state;
  }
};

const Votes = (props) => {
  const voteData = { userId: props.userId, grievanceId: props.grievanceId };

  const [voteState, voteDispatch] = useReducer(voteReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/grievance/vote", {
        method: "POST",
        body: JSON.stringify({
          userId: props.userId,
          grievanceId: props.grievanceId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      voteDispatch({
        type: "SET_DATA",
        payload: {
          upvoted: data.upvoted,
          downvoted: data.downvoted,
          errorMsg: null,
          upvotesCount: props.upvotesCount,
          downvotesCount: props.downvotesCount,
        },
      });
    };

    fetchData().catch((error) => {});
  }, [props]);

  const upvoteHandler = async () => {
    if (!voteState.upvoted && !voteState.downvoted) {
      try {
        const response = await fetch("/grievance/vote/up", {
          method: "POST",
          body: JSON.stringify(voteData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Upvote failed...");
        }

        voteDispatch({ type: "UPVOTE" });
      } catch (error) {
        console.log(error);
      }
    } else if (voteState.upvoted && !voteState.downvoted) {
      try {
        const response = await fetch("/grievance/vote/up", {
          method: "DELETE",
          body: JSON.stringify(voteData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Undo Upvote failed...");
        }

        voteDispatch({ type: "UNDO_UPVOTE" });
      } catch (error) {
        console.log(error);
      }
    } else if (!voteState.upvoted && voteState.downvoted) {
      voteDispatch({ type: "CANNOT_UPVOTE" });
    }
  };

  const downvoteHandler = async () => {
    if (!voteState.upvoted && !voteState.downvoted) {
      try {
        const response = await fetch("/grievance/vote/down", {
          method: "POST",
          body: JSON.stringify(voteData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Downvote failed...");
        }

        voteDispatch({ type: "DOWNVOTE" });
      } catch (error) {
        console.log(error);
      }
    } else if (!voteState.upvoted && voteState.downvoted) {
      try {
        const response = await fetch("/grievance/vote/down", {
          method: "DELETE",
          body: JSON.stringify(voteData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Undo Downvote failed...");
        }

        voteDispatch({ type: "UNDO_DOWNVOTE" });
      } catch (error) {
        console.log(error);
      }
    } else if (voteState.upvoted && !voteState.downvoted) {
      voteDispatch({ type: "CANNOT_DOWNVOTE" });
    }
  };

  return (
    <span style={{ marginBottom: "15px" }}>
      <button
        type="button"
        className={`btn btn-${voteState.upvoted ? "success" : "light"}`}
        onClick={upvoteHandler}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      >
        <span>{voteState.upvotesCount}</span>
        <i className="bi bi-hand-thumbs-up" style={{ marginLeft: "5px" }}></i>
      </button>
      <button
        type="button"
        className={`btn btn-${voteState.downvoted ? "danger" : "light"}`}
        onClick={downvoteHandler}
        style={{ marginRight: "10px", marginBottom: "10px" }}
      >
        <span>{voteState.downvotesCount}</span>
        <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "5px" }}></i>
      </button>
      {voteState.errorMsg && <span>{voteState.errorMsg}</span>}
    </span>
  );
};

export default Votes;
