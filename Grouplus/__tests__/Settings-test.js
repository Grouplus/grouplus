'use strict';
jest.setMock('react-native', {});
jest.dontMock('../app/components/Settings');

//var React = require('react-native');
var Settings = require('../app/components/Settings');
var TestUtils = require('react-addons-test-utils');

describe('Settings', function() {

    it('click on the export switch', function(){
      const myLink = TestUtils.renderIntoDocument(<SwitchIOS value={false}/>);
      const testSwitch = <SwitchIOS value={false}/>;
      const myLinkNode = React.findDOMNode(testSwitch);
      expect(myLinkNode.attributes['value'].value).toBe(false);
      TestUtils.Simulate.valueChange(myLinkNode);
      expect(myLinkNode.attributes['value'].value).toBe(true);
    });

});