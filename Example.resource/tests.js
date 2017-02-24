require(['js/module'], function(module) {

	QUnit.test('modules are loading', function(assert) {
		assert.equal(module, 'this module works', 'silly test');
	});

})

