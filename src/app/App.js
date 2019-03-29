import React, { Component } from 'react';
import '../style/App.css';
import Header from '../components/Header';
import CodeFormatter from '../code-formatter';
import Page from '../components/page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Page className=" flex-vertical">
          <CodeFormatter />
        </Page>
      </div>
    );
  }
}

export default App;
