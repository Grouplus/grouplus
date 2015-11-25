
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
});

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

