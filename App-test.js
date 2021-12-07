import React from 'react';
import renderer from 'react-test-renderer';
import App from"./App";
describe("<App/>", ()=>{
  it("has 1 child", ()=>{
    const taco= renderer.create(<App />).toJSON();
    expect(taco.children.length).toBe(1);
  });
});