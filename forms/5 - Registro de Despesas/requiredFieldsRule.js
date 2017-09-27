/**
 * Carrega regra de campos obrigatórios
 * @returns void.
 */
function requiredFieldsRule(){
	$("<style>").prop("type", "text/css")
		.html("\
			.required::before{\
				content: '*';\
				color: red;\
			}").appendTo("head");
	var fields = [];

	requiredFields.addField("cod_funcao",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("cdColaborador",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("nmColaborador",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("senhaColaborador",[INICIO,INICIO_0,ALTERACAO]);	
	requiredFields.addField("text_tipo_despesa___",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("vl_despesa___",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("text_Obs___",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("dtReferenciaDesp___",[INICIO,INICIO_0,ALTERACAO]);
	requiredFields.addField("decisaoGestor",[ATIVIDADE_GESTOR]);
	requiredFields.addField("decisaoDP",[ATIVIDADE_DP]);
	
	fields = requiredFields.getFields();

	for(var i=0;i<fields.length; i++){	

		if(fields[i].activities.indexOf(parseInt(CURRENT_STATE))>= 0){
			console.log(fields[i].name);
			setRequired(fields[i].name, true);
		}
			
	}
}

function getDivIds(div){
	div.find();
}

function setRequiredCustom(name, isAdding){
	//Específico para este form, original não funcional
	var label = $("label[for='"+name+"']");
	
	if(isAdding)
		label.addClass('required');
	else
		label.removeClass('required');
}