import axios from "axios";

// Components
import { useState } from "react";
import { Button } from "../../components";

// CSS
import "./FCFS.css";

const FCFS = () => {
  const [data, setData] = useState({
    tasks: [],
  });
  const [form, setForm] = useState({
    arrivalTime: 0,
    executionTime: 0,
  });
  const [datas, setDatas] = useState();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [tamp, setTamp] = useState(data.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      tasks: [...tamp, form],
    });
    setTamp(data.tasks);
    axios
      .post("http://localhost:3000/api/fcfs", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setDatas(response.data);
      })
      .catch((err) => console.log(`error: `, err));
  };

  return (
    <div className="fcfs-wrapper">
      <div className="form-wrapper">
        <h1>First Come First Service</h1>
        <form onSubmit={handleSubmit} className="card">
          <label>
            Arrival time:
            <input type="number" name="arrivalTime" onChange={handleInput} />
          </label>
          <label>
            Execution time:
            <input type="number" name="executionTime" onChange={handleInput} />
          </label>
          <div className="btn-wrapper">
            <Button type="reset">Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
      <div className="table-data-wrapper">
        {data.tasks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Arrival Time</th>
                <th>Execution Time</th>
              </tr>
            </thead>
            <tbody>
              {data.tasks.map((task, i) => (
                <tr key={i}>
                  <td>{task.arrivalTime}</td>
                  <td>{task.executionTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "Data masih kosong"
        )}
      </div>
      {datas && (
        <div className="datas-show-wrapper">
          <h3>Average waiting time: {datas.averageWaitingTime}</h3>
          <h3>Average turn around time: {datas.averageTurnaroundTime}</h3>
        </div>
      )}
    </div>
  );
};

export default FCFS;
