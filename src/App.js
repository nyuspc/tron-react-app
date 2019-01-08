import React, { Component } from 'react';
import { ApiService } from 'services';
import { sleep } from 'utils';
import './App.css';

class App extends Component {
  constructor(props) {
    // Inherit constructor
    super(props);
    // State for showing/hiding components when the API (blockchain) request is loading
    this.state = {
      loading: true,
      tronWeb: {
        installed: false,
        loggedIn: false
      },
      memo: {
        title: '',
        memo: '',
        auther: ''
      },
      inputTitle: '',
      inputMemo: ''
    };
  }
  componentWillMount() {
    this.initApp();
  }
  initApp: Function = async () => {
    await sleep(1000);
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };
      this.setState({
        tronWeb: tronWebState
      });
      return resolve();
    });
    if (this.state.tronWeb.installed) {
      ApiService.setTronWeb(window.tronWeb);
    }
    await sleep(1000);
    const _memo = await ApiService.readMemo();
    console.log('memo', _memo);
    this.setState({
      memo: _memo
    });
  }
  changeTitle: Function = (event) => {
    this.setState({
      inputTitle: event.target.value
    })
  }
  changeMemo: Function = (event) => {
    this.setState({
      inputMemo: event.target.value
    })
  }
  submitMemo: Function = async () => {
    await ApiService.postMemo(this.state.inputTitle, this.state.inputMemo);
    setTimeout( async () => {
      const _memo = await ApiService.readMemo();
      this.setState({
        memo: _memo
      });
    }, 1000);
  }
  render() {
    const { tronWeb } = this.state;
    return (
      <div className="App">
        { !tronWeb.installed && <div>Please install TRONPLAY or TRONLINK</div> }
        { tronWeb.installed && !tronWeb.loggedIn && <div>Please unlock TRONPLAY or TRONLINK</div>}
        { tronWeb.installed && tronWeb.loggedIn &&
          <div>
            <div className="title">
              { this.state.memo.title }
            </div>
            <div className="memo">
              { this.state.memo.memo}
            </div>
            <div className="author">
              { this.state.memo.author}
            </div>
            <div>Title:</div>
            <input value={this.state.inputTitle} onChange={this.changeTitle} placeholder="title" />
            <div>Memo:</div>
            <input value={this.state.inputMemo} onChange={this.changeMemo} placeholder="memo" />
            <button onClick={this.submitMemo}>Submit</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
