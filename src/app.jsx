import React from 'react';
import ReactDOM from 'react-dom';
import ListBox from './components/ListBox';


class App extends React.Component {

  render() {
    return (
      <div>
        <h1>React component prototype</h1>
        <ListBox selectedIndex="3">
          <div>Acai</div>
          <div>Acerola</div>
          <div>Apple</div>
          <div>Apricot</div>
          <div>Banana</div>
          <div>Blackberry</div>
          <div>Blueberry</div>
          <div>Cantaloupe</div>
          <div>Cherry</div>
          <div>Cranberry</div>
        </ListBox>
      </div>
    );
  }

}


ReactDOM.render(<App/>, document.querySelector('#root'));
