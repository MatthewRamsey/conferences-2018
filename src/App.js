import React, { Component } from 'react';
import './App.css';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import sortJsonArray from 'sort-json-array';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      conferences: []
    };
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/ryanburgess/2018-conferences/master/list.json')
      .then(response => response.json())
      .then(data => {
        let sortedDate = sortJsonArray(data, 'dateFrom', 'asc');
        this.setState({ isLoading: false, conferences: sortedDate })
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div id='container'>
          <CircularProgress size={80} thickness={5} />
        </div>
      )
    }

    return (
      <div id='container'>
        <h1>2018 Conference List</h1>
        <ul>
          {this.state.conferences.map(item => {
            let dates = item.date ? <div>Dates: {item.dateFrom} - {item.dateTo}</div> : <div>Date: {item.dateFrom}</div>;
            return (
              <a href={item.url}>
                <li>
                  <Card>
                    <CardTitle>
                      <h2><img id='icon' src={item.url + '/favicon.png'} /> {item.title}</h2>
                    </CardTitle>
                    <hr />
                    <CardText>
                      <h4>{dates}</h4>
                    <h4>Location: {item.where}</h4>
                    </CardText>
                  </Card>
                </li>
              </a>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App;