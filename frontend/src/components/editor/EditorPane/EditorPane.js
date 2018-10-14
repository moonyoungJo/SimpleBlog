import React, {Component} from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown'; 
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';


const cx = classNames.bind(styles);

class EditorPane extends Component{
  editor = null;
  codeMirror=null;

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // 좌측에 라인 넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
    });
  }
  componentDidMount(){
    this.initializeEditor();
  }

  render(){
    return(
      <div className={cx('editor-pane')}>
        <input className={cx('title')} placeholder="제목 입력" name="title" />
        <div className={cx('code-editor')} ref={ref=> this.editor=ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input name="tags" placeholder="태그 입력(쉼표로 구분해주세요)" />
        </div>
      </div>
    )
  }
}

export default EditorPane;