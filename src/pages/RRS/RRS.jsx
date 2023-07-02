import { useState } from "react";
import axios from "axios";

// Components
import { Button } from "../../components";

// CSS
import "./RRS.css";

const RRS = () => {
  const [input, setInput] = useState({
    processes: [],
    timeQuantum: 0,
  });
  const [dummy, setDummy] = useState({
    name: "",
    burstTime: 0,
  });
  const [tamp, setTamp] = useState(input.processes);
  const [data, setData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    console.log(input);
    setInput({
      ...input,
      processes: [...tamp, dummy],
    });
    setTamp(input.processes);
    axios
      .post("http://localhost:3000/api/schedule-RR", input, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <div className="rrs-wrapper">
      <div className="form-wrapper">
        <h1>Round Robin Service</h1>
        <form className="card" onSubmit={handleSubmit}>
          <label>
            Time quantum:
            <input
              type="number"
              onChange={(e) =>
                setInput({ ...input, timeQuantum: parseInt(e.target.value) })
              }
            />
          </label>
          <label>
            Proses name:
            <input
              type="text"
              onChange={(e) => setDummy({ ...dummy, name: e.target.value })}
            />
          </label>
          <label>
            Burst time:
            <input
              type="number"
              onChange={(e) =>
                setDummy({ ...dummy, burstTime: parseInt(e.target.value) })
              }
            />
          </label>
          <div className="btn-wrapper">
            <Button type="reset">Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
      <div className="table-data-wrapper">
        {input.processes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Arrival Time</th>
                <th>Execution Time</th>
              </tr>
            </thead>
            <tbody>
              {input.processes.map((task, i) => (
                <tr key={i}>
                  <td>{task.name}</td>
                  <td>{task.burstTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "Data masih kosong"
        )}
      </div>
      {data && (
        <div className="datas-show-wrapper">
          <h3>Average waiting time: {data.avgWaitingTime}</h3>
          <h3>Average turn around time: {data.avgTurnaroundTime}</h3>
        </div>
      )}
    </div>
  );
};

export default RRS;
