import React from 'react';
import ReactDOM from 'react-dom';
import ListBox from './components/ListBox';


class App extends React.Component {

  render() {
    return (
      <ListBox aria-label="Fruits" style={{ height: '100%' }} selectedIndex="20">
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
        <div>Currant</div>
        <div>Date</div>
        <div>Durian</div>
        <div>Fig</div>
        <div>Goji berry</div>
        <div>Gooseberry</div>
        <div>Grape</div>
        <div>Grapefruit</div>
        <div>Honeydew</div>
        <div>Jackfruit</div>
        <div>Kiwi</div>
        <div>Kumquat</div>
        <div>Lemon</div>
        <div>Lime</div>
        <div>Lychee </div>
        <div>Mango</div>
        <div>Mangosteen</div>
        <div>Mulberry</div>
        <div>Nectarine</div>
        <div>Orange</div>
        <div>Papaya</div>
        <div>Passion Fruit</div>
        <div>Peach</div>
        <div>Pear</div>
        <div>Pineapple</div>
        <div>Plum</div>
        <div>Pomegranate</div>
        <div>Pomelo</div>
        <div>Prickly Pear</div>
        <div>Raspberry</div>
        <div>Strawberry</div>
        <div>Tangerine</div>
        <div>Watermelon</div>
      </ListBox>
    );
  }

}


ReactDOM.render(<App/>, document.querySelector('#root'));
