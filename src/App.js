import React, { Component } from 'react';
import './App.css';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';


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
        this.setState({ isLoading: false, conferences: data })
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <CircularProgress size={80} thickness={5} />
        </div>
      )
    }

    

    return (
      <div>
        <h1>2018 Conference List</h1>
        <ul>
          {this.state.conferences.map(item => {
            let dates = item.date ? <div>Dates: {item.dateFrom} - {item.dateTo}</div> : <div>Date: {item.dateFrom}</div>;
            return (
              <a href={item.url}>
                <li>
                  <Card>
                    <CardHeader>
                      {item.title}
                    </CardHeader>
                    <CardText>
                      {dates}
                    </CardText>
                    <CardText>
                      Location: {item.where}
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