function displayFields(form, customHTML){ 
	var state = getValue("WKNumState");

	customHTML.append("<script> var CURRENT_STATE = "+state+";</script>"); 	
	
}
