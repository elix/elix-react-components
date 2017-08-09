import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ListBox from '../../src/components/ListBox.jsx';

describe('<ListBox />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<ListBox />);
    expect(ListBox.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});