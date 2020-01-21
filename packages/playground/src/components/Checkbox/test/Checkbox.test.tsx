import * as React from 'react';
import { CheckboxBase } from '../index';
import { mount } from 'enzyme';

describe('Checkbox', () => {
  it('renders something', () => {
    expect(mount(<CheckboxBase />)).toBeTruthy();
  });

  it('has an input', () => {
    const control = mount(<CheckboxBase />);
    const input = control
      .find('input')
      .first()
      .getDOMNode();
    expect(input).toBeTruthy();
  });

  it('can be checked', () => {
    expect(
      mount(<CheckboxBase checked />)
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(true);
  });

  it('can be unchecked', () => {
    expect(
      mount(<CheckboxBase />)
        .find('input')
        .first()
        .prop('checked'),
    ).not.toBe(true);
  });

  it('can switch check state', () => {
    const control = mount(<CheckboxBase checked={false} />);
    const inputChecked = control
      .find('input')
      .first()
      .prop('checked');
    expect(inputChecked).not.toBe(true);
    control.setProps({ checked: true });
    const inputCheckedAfter = control
      .find('input')
      .first()
      .prop('checked');
    expect(inputCheckedAfter).toBe(true);
  });

  it('changes state when clicked', () => {
    const control = mount(<CheckboxBase />);
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).not.toBe(true);

    control.find('input').simulate('change');

    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(true);

    control.find('input').simulate('change');

    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(false);
  });

  it('calls onChange when checked state changes', () => {
    const change = jest.fn();
    const control = mount(<CheckboxBase onChange={change} />); // let, the only constant is change
    control.simulate('change');
    expect(change).toHaveBeenCalled();
  });

  it('does not change value when onChange prevents default', () => {
    const change = jest.fn((e: any) => e.preventDefault());
    const control = mount(<CheckboxBase onChange={change} />);
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).not.toBe(true);
    control.simulate('change');
    expect(
      control
        .find('input')
        .first()
        .prop('checked'),
    ).not.toBe(true);
  });

  // it('does not call onChange value when onClick prevents default', () => {
  //   const click = jest.fn((e: any) => e.preventDefault());
  //   const change = jest.fn();
  //   const control = mount(<CheckboxBase onClick={click} onChange={change} />);
  //   control.simulate('click');
  //   expect(change).not.toHaveBeenCalled();
  // });

  it('calls onClick', () => {
    const click = jest.fn();
    const control = mount(<CheckboxBase onClick={click} />);
    control.simulate('click');
    expect(click).toHaveBeenCalled();
  });

  it('renders content', () => {
    const control = mount(<CheckboxBase label="foo" />);
    expect(control.find('label').length).toBe(1);
  });

  it('can render with a different root type', () => {
    const control = mount(<CheckboxBase slots={{ root: 'span' }} />);
    expect(control.find('span').length).toBe(1);
  });

  it('can render with a different input type', () => {
    const MyInput = () => (
      <a>
        <input type="hidden" value="I don't even know why anymore..." />
      </a>
    );
    const control = mount(<CheckboxBase slots={{ input: MyInput }} />);
    expect(control.find('a').length).toBe(1);
  });

  describe('class handling', () => {
    it('renders classes', () => {
      const control = mount(<CheckboxBase classes={{ root: 'foo' }} />);
      expect(control.find('div.foo').length).toBe(1);
    });

    it('renders classes for input', () => {
      const control = mount(<CheckboxBase classes={{ input: 'foo' }} />);
      expect(control.find('input.foo').length).toBe(1);
    });
  });

  describe('slotProps', () => {
    it('renders slotProps for input', () => {
      const control = mount(<CheckboxBase slotProps={{ input: { 'data-foo': 'bar' } }} />);
      expect(control.find('input[data-foo="bar"]').length).toBe(1);
    });

    it('renders slotProps for root', () => {
      const control = mount(<CheckboxBase slotProps={{ root: { 'data-foo': 'bar' } }} />);
      expect(control.find('div[data-foo="bar"]').length).toBe(1);
    });

    it('applies unused props to the root element', () => {
      const control = mount(<CheckboxBase data-foo="bar" />);
      expect(control.find('div[data-foo="bar"]').length).toBe(1);
    });
  });
});
