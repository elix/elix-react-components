import React from 'react';
import ReactDOM from 'react-dom';
import ListBox from '../../src/components/ListBox.jsx';


export default () => (
  <ListBox orientation="horizontal" aria-label="Face emoji" style={{ width: '252px' }}>
    <div className="emoji" alt="Grinning Face">😀</div>
    <div className="emoji" alt="Grinning Face With Smiling Eyes">😁</div>
    <div className="emoji" alt="Face With Tears of Joy">😂</div>
    <div className="emoji" alt="Smiling Face With Heart-eyes">😍</div>
    <div className="emoji" alt="Smiling Face With Smiling Eyes">😊</div>
    <div className="emoji" alt="Thinking Face">🤔</div>
    <div className="emoji" alt="Smiling Face With Open Mouth & Closed Eyes">😆</div>
    <div className="emoji" alt="Face With Open Mouth">😮</div>
    <div className="emoji" alt="Face With Rolling Eyes">🙄</div>
    <div className="emoji" alt="Face Blowing a Kiss">😘</div>
  </ListBox>
);
