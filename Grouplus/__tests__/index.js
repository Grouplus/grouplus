var Q = require('q');

jest.dontMock('../app/components/helpers/AsyncStorageWrapper');
var StorageHelper = require('../app/components/helpers/AsyncStorageWrapper');

jest.setMock('react-native', {
	// mock asyncStorage function implementation
	// the Q module helps to mock promises, getItem always return fake data
	AsyncStorage: {
	    getItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(JSON.stringify({testTodo: "task"}));
			})
		}),

		setItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(null);
			});
		}),
		removeItem: jest.genMockFunction().mockImplementation(function() {
			return Q.promise(function(resolve) {
				resolve(null);
			})
		}), 
		clear: jest.genMockFunction().mockImplementation(function() {
			return null;
		})
	}
});

describe('save', function() {
	it('save an object with key value no error', function() {
		return 
		StorageHelper.save('test', {testTodo: "task"}).then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('get', function() {
	it('get data with key with without error', function() {
		return 
		StorageHelper.get('test').then(function(error) {
			expect(error).toEqual({testTodo: "task"});
		});
	});
});

describe('update', function() {
	it('update an object without error', function() {
		return 
		StorageHelper.update('test', {testTodo: 'hey'}).then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

describe('delete', function() {
	it('delete an object without errors', function() {
		return 
		StorageHelper.delete('test').then(function(error) {
			expect(error).toEqual(null);
		});
	});

});

