// Filename: app.js
define(["views/pbVistaPrincipal"], 
	function(VistaPrincipal) {
		var initialize = function() {
			vista = new VistaPrincipal({el:"#mainvisualization"});
		}

		return { 
			initialize: initialize
		};
	}
);
		
