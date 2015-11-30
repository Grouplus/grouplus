// jest.setMock('react-native', {
//     NativeModules: {}
// });
// jest.dontMock('../app/components/helpers/PlainTextScreen');
// var ReactTestUtils = require('react-addons-test-utils');
// var React = require('react');

jest.dontMock('../app/components/helpers/PlainTextScreen');
jest.dontMock('../app/components/Nav');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var PlainTextScreen = require('../app/components/helpers/PlainTextScreen');
var Nav = require('../app/components/Nav');

describe('Nav', function() {
  it('should default to a transparent overlay', function() {
     var Nav1= TestUtils.isElement(
      /*jshint ignore:start */
      < Nav />
      /*jshint ignore:end */
    );
    expect(Nav1).toBe(true);
  });
});
// describe('MyComponent', function() {
//     it('should render user name', () => {
//         shallowRenderer.render(() => <PlainTextView text={'Loading'}/>);
 
//         let instance = shallowRenderer.getMountedInstance();
//         let output;
 
//         output = shallowRenderer.getRenderOutput();
//         expect(output).toContainReactNodeInTreeLike(<Text>{'Loading'}!</Text>);
//     });
// });
// describe('Photos', function() {
//     it('render images', function(){
//        var screen1= ReactTestUtils.render(
//       <PlainTextScreen text={'Loading'}/>
//     );
//       expect(screen1.textContent).toBe('Loading');
//     });
// });

/*
jest.setMock('react-native', {
    NativeModules: {}
});
jest.dontMock('../app/components/Photos');
var ReactTestUtils = require('react-addons-test-utils');

var PhotosList = require('../app/components/Photos');

describe('Photos', function() {
    it('render images', function(){
       var photos = ReactTestUtils.render(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );
      expect(myLinkNode.attributes['value'].value).toBe(false);
    });
});*/

/*
describe('imageOptions', () => {
  it('returns null for invalid input', () => {
    expect(imageOptions().length).toBe(null);
  });
}*/
/*
describe('event export test', function() {
 it('eventexport', function() {
   var sum = {CalendarModule};

   CalendarManager.addEvent(rowData.name, rowData.location, rowData.dueDate, rowData.enddate, 
          (response) =>{
            if(response){
              alert("Export Successful!");
            }else{
              alert("Export Event Failed. Please check event date format or access to calcendar!");
            }
          });

   expect(sum.addEvent("name1", "location1", )).toBe(true);
 });
});*/

