import React, {Component} from 'react';
import './App.css';
import {changeJson, fetchJson} from "./store/actions/postsAction";
import {connect} from 'react-redux'

class App extends Component{
  componentDidMount(){
    this.props.fetchJson()
  }
  select = () => {
    this.props.changeJson();
    console.log(window.getSelection(), 7777);
    console.log(window.getSelection().toString(), 432423);

    console.log(window.getSelection().getRangeAt(0), 'hfghh')
  }

  render(){
    return (
      <div className="App" style={{marginTop: '50px'}}>
        {this.props.json && this.props.json.map((item, key) =>
          <span key={key} style={{color: item.styles.color, backgroundColor: item.styles.background}} onMouseUp={this.select} onDoubleClick={this.select}>{item.name}</span>
        )}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  json: state.posts.json
})

const mapDispatchToProps = {
  fetchJson: fetchJson,
  changeJson: changeJson
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
