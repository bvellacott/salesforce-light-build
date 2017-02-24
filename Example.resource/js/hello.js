define(['jquery'], function(j$) {
	return {
		setup: function() {
			j$('.hello').on('click', function() { alert('Hello!'); });
		}
	};
});