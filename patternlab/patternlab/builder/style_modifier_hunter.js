(function () {
	"use strict";

	var style_modifier_hunter = function(){

		function consumestylemodifier(pattern, partial, patternlab){

			//extract the classname from the stylemodifier which comes in the format of :className
			var styleModifier = partial.match(/:([\w\-_])+/g) ? partial.match(/:([\w\-_])+/g)[0].slice(1) : null;
			if(styleModifier){

				if(patternlab.config.debug){
					console.log('found partial styleModifier within pattern ' + pattern.key);
				}

				//replace the stylemodifier placeholder with the class name
				pattern.extendedTemplate = pattern.extendedTemplate.replace('{{styleModifier}}', styleModifier);
			}
		}

		return {
			consume_style_modifier: function(pattern, partial, patternlab){
				consumestylemodifier(pattern, partial, patternlab);
			}
		};

	};

	module.exports = style_modifier_hunter;

}());
