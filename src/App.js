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
    let js = this.state.json;
    // let some = js.findIndex(item => item.text === window.getSelection().anchorNode.wholeText);
    // console.log(some, 444)
    // console.log(js, 88888888)
    // js[some].backgroundColor = 'gold';
    // this.setState({
    //   json: js
    // })
    // this.props.changeJson(window.getSelection().anchorNode.wholeText, window.getSelection().toString());
    // js[window.getSelection().anchorNode.parentNode.dataset.index]
    if(window.getSelection().anchorNode.parentNode.dataset.index === window.getSelection().extentNode.parentNode.dataset.index){
      let start = window.getSelection().anchorOffset;
      let finish = window.getSelection().focusOffset;
      let initialText = js[window.getSelection().anchorNode.parentNode.dataset.index].text;
      js[window.getSelection().anchorNode.parentNode.dataset.index] = {
        text: initialText.slice(0, start),
        fontSize: js[window.getSelection().anchorNode.parentNode.dataset.index].fontSize,
        backgroundColor: js[window.getSelection().anchorNode.parentNode.dataset.index].backgroundColor,
        color: js[window.getSelection().anchorNode.parentNode.dataset.index].color,
      }
      js.splice(window.getSelection().anchorNode.parentNode.dataset.index + 1, 0, {
        text: window.getSelection().toString(),
        fontSize: js[window.getSelection().anchorNode.parentNode.dataset.index].fontSize,
        backgroundColor: 'gold',
        color: js[window.getSelection().anchorNode.parentNode.dataset.index].color,
      })
      js.splice(window.getSelection().anchorNode.parentNode.dataset.index + 2, 0, {
        text: initialText.slice(finish),
        fontSize: js[window.getSelection().anchorNode.parentNode.dataset.index].fontSize,
        backgroundColor: js[window.getSelection().anchorNode.parentNode.dataset.index].backgroundColor,
        color: js[window.getSelection().anchorNode.parentNode.dataset.index].color,
      })
    }
    console.log(js, 555555555)
    this.setState({
      json: js
    })
    console.log(window.getSelection(), 7777);
    console.log(window.getSelection().anchorNode.parentNode.dataset.index, 888);
    console.log(window.getSelection().extentNode.parentNode.dataset.index, 999);
    console.log(window.getSelection().toString(), 432423);

    // console.log(window.getSelection().getRangeAt(0), 'hfghh')


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
    return (
      <Fragment>
        <div className="App" style={{marginTop: '50px'}} onMouseUp={this.select} onDoubleClick={this.select}>
          {this.state.json && this.state.json.map((item, key) =>
            <span data-index={key} key={key} style={{color: item.color, backgroundColor: item.backgroundColor, fontSize: item.fontSize}}>{item.text}</span>
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
