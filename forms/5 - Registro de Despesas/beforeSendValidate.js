var lineBreaker = "</br>";
var rules = [validateTable, validateField];
var beforeSendValidate = function(CURRENT_STATE, NEXT_STATE){
	var errorMsg = ""; 
	if(CURRENT_STATE == NEXT_STATE){
		return;
	}

	//VALIDAÇÃO CUSTOMIZADA DOS CAMPOS
	errorMsg += validateCustomField();
	
	var fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE) >= 0){
			console.log("fields[i] : "+fields[i]);
			var selector = (fields[i].name.indexOf("___") > 0) ? 
					'[name^="'+fields[i].name+'"]' 
					: '[name="'+fields[i].name+'"]';
			$(selector).each(function(){
				for(rule in rules){
					console.log("rules[rule] : "+rules[rule]);
					var validation = rules[rule](this, selector);
					if(validation.status != "success"){
						if(validation.status === "error"){
							errorMsg += validation.message;
						}
						break;
					}
				}
			});
		}
	}
	if(errorMsg != ""){
		throw errorMsg;
	}
}

function validateCustomField(){
	var errorMsg = "";
	var customFields = new Fields();
	
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == null || CURRENT_STATE == ALTERACAO){
		
		if($('#tableDespesa').find("tr").size() <= 2){
			errorMsg += "É necessário informar no mínimo uma despesa! "+ lineBreaker;
		}		
		
	}
	
	if(CURRENT_STATE == ATIVIDADE_GESTOR){
		
		if($('#decisaoGestor').val() == "reprovado" && $('#text_ObsGestor').val() == ""){
			errorMsg += "É necessário informar uma observação para a reprovação! "+ lineBreaker;
		}		
		
	}	
	
	if(CURRENT_STATE == ATIVIDADE_DP){
		
		if($('#decisaoDP').val() == "reprovado" && $('#text_ObsDP').val() == ""){
			errorMsg += "É necessário informar uma observação para a reprovação! "+ lineBreaker;
		}		
		
	}		
		
	var fields = customFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE) >= 0){
			console.log("fields : "+fields[i]);
			var selector = (fields[i].name.indexOf("___") > 0) ? 
					'[name^="'+fields[i].name+'"]' 
					: '[name="'+fields[i].name+'"]';
			$(selector).each(function(){
				for(rule in rules){
					console.log("rules[rule] : "+rules[rule]);
					var validation = rules[rule](this, selector);
					if(validation.status != "success"){
						if(validation.status === "error"){
							errorMsg += validation.message;
						}
						break;
					}
				}
			});
		}
	}
	console.log("return error message custom: " + errorMsg);
	
	return errorMsg;
}

/**
 * Regra de negócio: Valida se pai x filho tem ao menos um registros.
 * @param el: Elemento sendo avaliado.
 * @returns validation Validation.
 */
function validateTable(el){
	var validation = new Validation();
	if($(el).prop("tagName") === "TABLE" ){
		validation.status = "ignore";
		if($(el).find("tr").size() <= 2){
			validation.message = "Insira ao menos um registro no pai x filho: "
				+getLabel($(el).attr("name"))+lineBreaker;
			validation.status = "error";
		}
	}
	return validation;
}

/**
 * Regra de negócio: Valida campos, sejam radio, check, inputs mesmo que em pai x filho.
 * @param el: Elemento sendo avaliado.
 * @param selector: Seletor usado para pegar o elemento.
 * @returns validation Validation.
 */
function validateField(el, selector){
	var validation = new Validation();
	if((
			["radio","checkbox"].indexOf($(el).attr("type")) >= 0
			&& $(selector+':checked').size() <= 0
		) 
		|| (el.value == "" && el.tagName != "SPAN")){ 
		validation.message = "Campo "+getLabel($(el).attr("name"))+" é obrigatório!"+lineBreaker;
		validation.status = "error";
	}
	return validation;
}


/**
 * Classe validação.
 * @attribute status: success, ignore ou error.
 * @attribute messagem: Messagem de erro.
 */
function Validation(){
	this.status = "success";
	this.message = "";
}

var requiredFields = new Fields();
/**
 * Classe campos.
 * @attribute fields: success, ignore ou error.
 * @method addField: Adiciona objetos compostos por String name e Array activities.
 * @method getFields: Recupera campos.
 */
function Fields(){
	this.fields = [];
	this.addField = function(name, arrayActivities){
		this.fields.push({"name":name,"activities":arrayActivities});
	}
	this.getFields = function(){
		return this.fields;
	}
}

/**
 * Inclui o * indicativo de campo obrigatório nos labels a partir do nome do campo.
 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
 * @param isRequired: é obrigatório? booleano.
 * @returns void.
 */
function setRequired(name, isRequired){
	name = name.split("___")[0];
	(isRequired) ? $("[for='"+name+"']").addClass('required')
		: $("[for='"+name+"']").removeClass('required');
}

/**
 * Retorna label baseado no name do campo, verificando atributo "for" da label.
 * @param name: name do campo.
 * @returns label: texto do label.
 */
function getLabel(name) {
	name = name.split("___")[0];
	return $("[for='"+name+"']").html();
}

function getClosestByElement(element, selector){
	var max = 10;
	returnElement = undefined;
	while(returnElement == null && max >= 0){
		if($(element).is(selector)){
			returnElement = element;
		}else{
			element = element.parent();
		}
		max--;
	}

	return returnElement;
}