import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const info = (props) => (
  <tr>
    <td>{props.info.username}</td>
    <td>{props.info.Email}</td>
    <td>{props.info.Phone}</td>
    <td>{props.info.CV /*.substring(0, 10)*/}</td>
    <td>
      <Link to={"/edit/" + props.info._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteinfo(props.info._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class infoList extends Component {
  constructor(props) {
    super(props);
    //this.deleteinfo = this.deleteinfo.bind(this);
    this.state = { info: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/info/")
      .then((response) => {
        this.setState({ info: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteimfo(id) {
    axios.delete("http://localhost:3000/info/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      info: this.state.info.filter((el) => el._id !== id),
    });
  }

  infoList() {
    return this.state.info.map((currentinfo) => {
      return (
        <info
          info={currentinfo}
          deleteinfo={this.deleteinfo}
          key={currentinfo._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged info</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>CV</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.infoList()}</tbody>
        </table>
      </div>
    );
  }
}
