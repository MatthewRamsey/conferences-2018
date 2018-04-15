import React, { Component } from 'react';
import './App.css';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import sortJsonArray from 'sort-json-array';
import githubIcon from './img/Github.png';

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
        <div>
        <a href="https://github.com/MatthewRamsey/conferences-2018"><h1>2018 Conference List <img id="icon" src={githubIcon} /></h1></a>
        </div>
        <div id='cardContainer'>
          <ul>
            {this.state.conferences.map(item => {
              let dates = item.dateTo ? <div>Dates: {item.dateFrom} - {item.dateTo}</div> : <div>Date: {item.dateFrom}</div>;
              return (
                <a href={item.url}>
                  <li>
                    <Card style={{ width: '35%', display: 'inline-block' }}>
                      <CardTitle>
                        <h2>{item.title}</h2>
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
      </div>
    )
  }
}

export default App;