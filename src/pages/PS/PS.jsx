import axios from "axios";
import { useState } from "react"

//  Components
import { Button } from "../../components";

// CSS
import './PS.css'

const PS = () => {
  const [input, setInput] = useState()
  const [data, setData] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/schedule-priority", input, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => console.log(response.data))
    .catch((err) => console.log("error: ", err))
    axios.get("http://localhost:3000/api/schedule-priority")
    .then((response) => {
      console.log(response.data)
      setData(response.data)
    })
    .catch((err) => console.log("error: ", err))
  }

  return(
    <div className="ps-wrapper">
      <div className="form-wrapper">
        <h1>Priority Service</h1>
        <form className="card" onSubmit={handleSubmit}>
          <label>
            Proses name:
            <input type="text" onChange={(e) => setInput({...input, process: e.target.value})} />
          </label>
          <label>
            Burst time:
            <input type="number" onChange={(e) => setInput({...input, burstTime: parseInt(e.target.value)})} />
          </label>
          <label>
            Priority:
            <input type="number" onChange={(e) => setInput({...input, priority: parseInt(e.target.value)})} />
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
                <th>Burst Time</th>
                <th>Priority</th>
                <th>Waiting Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((task, i) => (
                <tr key={i}>
                  <td>{task.process}</td>
                  <td>{task.burstTime}</td>
                  <td>{task.priority}</td>
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
        </div>
      )}
    </div>
  )
}

export default PS