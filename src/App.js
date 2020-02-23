import React, {Component} from 'react';
import './App.css';
import json from './inital'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      json: json,
      backgroundColor: '',
      color: '',
      fontSize: '',
      arrFonts: [10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40],
      colors: ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
        'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
        'silver', 'teal', 'white', 'yellow']
    }
  }

  select = () => {
    document.querySelector('.tools').classList.add('ready')
    // document.querySelector('.MuiSelect-select').innerHTML = '<span>&#8203;</span>'
  }

  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.name === 'fontSize' ? e.target.value + 'px' : e.target.value;
    let js = this.state.json;
    let selectStart = window.getSelection().anchorNode.parentNode.dataset.index;
    let selectFinish = window.getSelection().extentNode.parentNode.dataset.index;
    if(selectStart > selectFinish){
      selectStart = window.getSelection().extentNode.parentNode.dataset.index;
      selectFinish = window.getSelection().anchorNode.parentNode.dataset.index
    }

    let start = window.getSelection().anchorOffset;
    let finish = window.getSelection().focusOffset;
    let initialText = js[selectStart].text;
    if(start > finish){
      start = window.getSelection().focusOffset;
      finish = window.getSelection().anchorOffset
    }
    this.setState({
      [name]: e.target.value
    }, () => {
      //1 word
      if(selectStart === selectFinish){
        if(window.getSelection().getRangeAt(0).commonAncestorContainer.length === finish && window.getSelection().getRangeAt(0).startOffset === 0){
          js[selectStart] = {
            ...js[selectStart],
            [name]: value,
          }
        }else if(start === 0 && window.getSelection().getRangeAt(0).commonAncestorContainer.length !== finish){
          js.splice(+selectStart + 1, 0, {
            ...js[selectStart],
            text: initialText.slice(finish),
          });
          js[selectStart] = {
            ...js[selectStart],
            text: initialText.slice(0, finish),
            [name]: value,
          };
        } else if(window.getSelection().getRangeAt(0).commonAncestorContainer.length === finish){
          js.splice(+selectStart + 1, 0, {
            ...js[selectStart],
            text: initialText.slice(start),
            [name]: value,
          });
          js[selectStart] = {
            ...js[selectStart],
            text: initialText.slice(0, start),
          };
        }else{
          js[selectStart] = {
            ...js[selectStart],
            text: initialText.slice(0, start),
          };
          js.splice(+selectStart + 1, 0, {
            ...js[selectStart],
            text: window.getSelection().toString(),
            [name]: value,
          });
          js.splice(+selectStart + 2, 0, {
            ...js[selectStart],
            text: initialText.slice(finish),
          })
        }
      }else{
        //2 words
        js[selectStart] = {
          ...js[selectStart],
          text: initialText.slice(0, window.getSelection().getRangeAt(0).startOffset),
        };
        let checkVal = Object.keys(js[selectStart]).filter(el => el !== 'text').map(item => {
          return js[+selectStart + 1] ? js[selectStart][item] === js[+selectStart + 1][item] : js[selectStart][item] === js[+selectStart - 1][item]
        }).every(el => el);

        if(checkVal){
          js.splice(+selectStart + 1, 0, {
            ...js[selectStart],
            text: window.getSelection().toString(),
            [name]: value,
          });
          js.splice(+selectStart + 2, 1)
        }else{
          let currentText = js[+selectStart + 1].text;
          js.splice(+selectStart + 1, 0, {
            ...js[selectStart],
            text: initialText.slice(window.getSelection().getRangeAt(0).startOffset),
            [name]: value,
          });

          js.splice(+selectStart + 2, 0, {
            ...js[+selectStart + 2],
            text: currentText.slice(0, window.getSelection().getRangeAt(0).endOffset),
            [name]: value,
          });
          js[+selectStart + 3] = {
            ...js[+selectStart + 3],
            text: currentText.slice(window.getSelection().getRangeAt(0).endOffset),
          };
        }

      }

      //check and concat objects
      let index = start === 0 ? +selectStart : +selectStart + 1;
      const { text, ...styles } = js[index];

      const checkSibling = (i) => {
        if(js[index + i]){
          let stylesSibling = Object.assign({}, js[index + i]);
          delete stylesSibling.text;
          if(JSON.stringify(styles) === JSON.stringify(stylesSibling)){
            if(i > 0){
              js[index].text += js[index + i].text;
              js.splice(index + 1, 1);

            }else if(i < 0){
              js[index + i].text += js[index].text;
              js.splice(index, 1);
              return true;
            }else{
              js[index - 1].text += js[index + i].text;
              js.splice(index, 1);
            }
          }
        }
      };
      checkSibling(-1) ? checkSibling(0) : checkSibling(1);

      this.setState({
        json: js
      })

    })
  }

  setInitialValues = () => {
    document.querySelector('.tools').classList.remove('ready');
    // document.querySelector('.MuiSelect-select').innerHTML = '<span>&#8203;</span>'
  }

  render(){
    return (
      <div className="App" style={{marginTop: '50px'}} onBlur={this.setInitialValues}>
        <div className='tools'>
          <FormControl style={{minWidth: '90px'}}>
            <InputLabel id="demo-simple-select-label">font-size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="fontSize"
              value={this.state.fontSize}
              onChange={this.onChange}
            >
              {this.state.arrFonts.map((item, key) =>
                <MenuItem key={key} value={item}>{item}</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl style={{minWidth: '70px'}}>
            <InputLabel id="demo-simple-select-label">color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="color"
              value={this.state.color}
              onChange={this.onChange}
            >
              {this.state.colors.map((item, key) =>
                <MenuItem key={key} value={item}>{item}</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl style={{minWidth: '120px'}}>
            <InputLabel id="demo-simple-select-label">background</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="backgroundColor"
              value={this.state.backgroundColor}
              onChange={this.onChange}
            >
              {this.state.colors.map((item, key) =>
                <MenuItem key={key} value={item}>{item}</MenuItem>
              )}
            </Select>
          </FormControl>

        </div>
        <div onMouseUp={this.select} onDoubleClick={this.select} className='editor'>
          {this.state.json && this.state.json.map((item, key) =>
            <span
              data-index={key}
              key={key}
              style={{color: item.color, backgroundColor: item.backgroundColor, fontSize: item.fontSize}}
              dangerouslySetInnerHTML={{__html:  item.text}}
            />
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(JSON.stringify(this.state.json))}
          style={{marginTop: '50px'}}
        >Get JSON</Button>
      </div>
    );
  }

}


export default App;
