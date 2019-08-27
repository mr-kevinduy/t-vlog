import React from 'react';

const reverse = WrapperComponent =>
  ({ children, ...props }) =>
    <WrapperComponent {...props}>
      { children.split('').reverse().join('') }
    </WrapperComponent>

const Name = props => <span>{ props.children }</span>
export const ReverseName = reverse(Name);
