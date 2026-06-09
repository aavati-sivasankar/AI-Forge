import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "@clerk/clerk-react";
import DashboardLayout
from "../layouts/DashboardLayout";

import {
  getHistory,
  clearHistory,
} from "../api/historyApi";
import ReactMarkdown from "react-markdown";

function History() {

  const { getToken } =
    useAuth();

  const [history,
    setHistory] =
    useState([]);

  const [selectedItem,
    setSelectedItem] =
    useState(null);

  useEffect(() => {

    const loadHistory =
      async () => {

        try {

          const token =
            await getToken();

          const response =
            await getHistory(
              token
            );

          setHistory(
            response.history
          );

        } catch (error) {

          console.log(error);

        }
      };

    loadHistory();

  }, [getToken]);

  const handleView =
    (item) => {

      setSelectedItem(item);

    };
  const handleClearHistory =
  async () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to clear your history?\n\nThis action cannot be undone."
      );

    if (!confirmed) return;

    try {

      const token =
        await getToken();

      await clearHistory(
        token
      );

      setHistory([]);
      setSelectedItem(null);

      alert(
        "History cleared successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to clear history"
      );

    }

};

  return (
    <DashboardLayout>

      <div className="d-flex justify-content-between align-items-center mb-3">

      <h1 className="mb-0">
        History
      </h1>

      <button
        className="btn btn-danger"
        onClick={
          handleClearHistory
        }
      >
        Clear History
      </button>

</div>

      <div className="card p-3">

        <table
          className="table table-hover"
        >

          <thead>
            <tr>

              <th>Type</th>

              <th>Prompt</th>

              <th>Date</th>

              <th>Action</th>

            </tr>
          </thead>

          <tbody>

            {
              history.length === 0 ? (

                <tr>
                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No history found
                  </td>
                </tr>

              ) : (

                history.map(
                  item => (

                    <tr
                      key={item.id}
                    >

                      <td>
                        {item.type}
                      </td>

                      <td>
                        {item.prompt}
                      </td>

                      <td>
                        {
                          new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        }
                      </td>

                      <td>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleView(item)
                          }
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  )
                )

              )
            }

          </tbody>

        </table>

      </div>

      {
        selectedItem && (

          <div
            className="card p-4 mt-4"
          >

            <h3>
              History Details
            </h3>

            <hr />

            <p>

              <strong>
                Type:
              </strong>

              {" "}

              {selectedItem.type}

            </p>

            <p>

              <strong>
                Prompt:
              </strong>

              {" "}

              {selectedItem.prompt}

            </p>

            <p>

              <strong>
                Generated On:
              </strong>

              {" "}

              {
                new Date(
                  selectedItem.createdAt
                ).toLocaleString()
              }

            </p>

            <hr />

            <h5>
              Generated Result
            </h5>

            <div
              className="history-result"
            >
              <ReactMarkdown>
                {selectedItem.result}
              </ReactMarkdown>
            </div>

          </div>

        )
      }

    </DashboardLayout>
  );
}



export default History; 