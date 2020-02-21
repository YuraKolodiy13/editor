import React, {Component} from 'react';
import './App.css';
import {changeJson, fetchJson} from "./store/actions/postsAction";
import {connect} from 'react-redux'

class App extends Component{
  componentDidMount(){
    this.props.fetchJson()
  }
  select = () => {
    console.log(3242)
    this.props.changeJson();
    console.log(document.getSelection().anchorNode.parentNode.style.cssText, 666)
    console.log(document.getSelection(), 77)
  }

  render(){
    console.log(this.props.json, 989)
    return (
      <div className="App" style={{marginTop: '50px'}}>
        {this.props.json && this.props.json.map((item, key) =>
          <span key={key}><span style={{color: item.styles.color, backgroundColor: item.styles.background}} onMouseUp={this.select} onDoubleClick={this.select}>{item.name}</span> </span>
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
