import React, {Component, Fragment} from 'react';
import './App.css';
import {changeJson, fetchJson} from "./store/actions/postsAction";
import {connect} from 'react-redux'
import json from './state'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      json: json
    }
  }
  componentDidMount(){
    this.props.fetchJson()
  }
  select = () => {
    // let js = this.state.json;
    // let some = js.findIndex(item => item.text === window.getSelection().anchorNode.wholeText);
    // console.log(some, 444)
    // console.log(js, 88888888)
    // js[some].backgroundColor = 'gold';
    // this.setState({
    //   json: js
    // })
    // this.props.changeJson(window.getSelection().anchorNode.wholeText, window.getSelection().toString());
    console.log(window.getSelection(), 7777);
    console.log(window.getSelection().toString(), 432423);

    console.log(window.getSelection().getRangeAt(0), 'hfghh')


    // var range;
    // if (document.selection && document.selection.createRange) {
    //   range = document.selection.createRange();
    //   return range.htmlText;
    // }
    // else if (window.getSelection) {
    //   var selection = window.getSelection();
    //   if (selection.rangeCount > 0) {
    //
    //     range = selection.getRangeAt(0);
    //     var clonedSelection = range.cloneContents();
    //     var div = document.createElement('div');
    //     div.appendChild(clonedSelection);
    //     console.log(clonedSelection, 1111)
    //     return div.innerHTML;
    //   }
    //   else {
    //     return '';
    //   }
    // }
    // else {
    //   return '';
    // }
  }

  render(){
    console.log(this.state, 3333)
    return (
      <Fragment>
        <div className="App" style={{marginTop: '50px'}} onMouseUp={this.select} onDoubleClick={this.select}>
          {this.state.json && this.state.json.map((item, key) =>
            <span key={key} style={{color: item.color, backgroundColor: item.backgroundColor, fontSize: item.fontSize}}>{item.text}</span>
          )}
        </div>
        {/*<div onMouseUp={this.select} onDoubleClick={this.select}>*/}
          {/*{this.props.text}*/}
        {/*</div>*/}
      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  json: state.posts.json,
  text: state.posts.text
})

const mapDispatchToProps = {
  fetchJson: fetchJson,
  changeJson: changeJson
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
