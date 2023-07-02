// Components
import { useState } from "react";
import { Button } from "../../components";

// CSS
import "./SJFS.css";
import axios from "axios";

const SJFS = () => {
  const [input, setInput] = useState();
  const [data, setData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/schedule-sfj", input, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log("error: ", err));
    axios
      .get("http://localhost:3000/api/schedule-sfj")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <div className="sjfs-wrapper">
      <div className="form-wrapper">
        <h1>Short Job Service</h1>
        <form className="card" onSubmit={handleSubmit}>
          <label>
            Proses name:
            <input type="text" onChange={(e) => setInput({...input, process: e.target.value})} />
          </label>
          <label>
            Arrival Time:
            <input type="number" onChange={(e) => setInput({...input, arrivalTime: parseInt(e.target.value)})} />
          </label>
          <label>
            Burst time:
            <input type="number" onChange={(e) => setInput({...input, burstTime: parseInt(e.target.value)})} />
          </label>
          <div className="btn-wrapper">
            <Button type="reset">Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
      <div className="table-data-wrapper">
        {data !== undefined ? (
          <table>
            <thead>
              <tr>
                <th>Process name</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Waiting Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((task, i) => (
                <tr key={i}>
                  <td>{task.process}</td>
                  <td>{task.arrivalTime}</td>
                  <td>{task.burstTime}</td>
                  <td>{task.waitingTime}</td>
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
          <h3>Average waiting time: {data.reduce((a, b) => a + b.waitingTime, 0) / data.length}</h3>
          <h3>Average turn around time: {data.reduce((a, b) => a + b.turnaroundTime, 0) / data.length}</h3>
        </div>
      )}
    </div>
  );
};

export default SJFS;
