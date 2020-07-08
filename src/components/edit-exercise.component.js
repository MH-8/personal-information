import React, { Component } from "react";
import axios from "axios";
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class Editinfo extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCV = this.onChangeCV.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      Email: "",
      Phone: 0,
      CV: 0,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/info/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          Email: response.data.Email,
          Phone: response.data.Phone,
          CV: response.data.CV,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      Email: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      Phone: e.target.value,
    });
  }

  onChangeCV(e) {
    this.setState({
      CV: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const info = {
      username: this.state.username,
      Email: this.state.Email,
      Phone: this.state.Phone,
      CV: this.state.CV,
    };

    console.log(info);

    axios
      .post(
        "http://localhost:3000/info/update/" + this.props.match.params.id,
        info
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit info Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.Email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group">
            <label>CV: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.CV}
              onChange={this.onChangeCV}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit info Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
