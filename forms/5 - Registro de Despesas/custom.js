var INDEX = null;
$(document).ready(function(){
	bindings();	
	activeCalendar();	
	numeralLoad();	
	requiredFieldsRule();
	enableFields();		
});

function activeCalendar(){
	//FLUIGC.calendar('.dateRefer');
}

function activeCalendarOnChildren(element){
	FLUIGC.calendar(element,{
		 maxDate: new Date()
	});
}

function bindings(){
	
	if(CURRENT_STATE == INICIO_0 || CURRENT_STATE == INICIO || CURRENT_STATE == null || CURRENT_STATE == ALTERACAO){
		
		$("#senhaColaborador").blur(function(){
			
			if($("#cdColaborador").val() != ""){
			
				if($("#senhaColaborador").val() != ""){
					
					var cod_colaborador = $("#cdColaborador").val();
				
					var cdColaborador = DatasetFactory.createConstraint("chapa_colaborador", cod_colaborador, cod_colaborador, ConstraintType.MUST);
					var senha         = DatasetFactory.createConstraint("cod_senha", this.value, this.value, ConstraintType.MUST);
					
					var dataset = DatasetFactory.getDataset("ds_cad_colaboradores", null, [cdColaborador,senha], null);
									
					if(dataset == null || dataset.values.length == 0){
						alertBox("Senha incorreta! Favor informe uma senha válida para este usuário.");
						$("#senhaColaborador").val("");	
					}				
					
				}else{
					alertBox("É necessário informar a sua senha");
					$("#senhaColaborador").val("");	
				}				
				
			}else{
				alertBox("É necessário informar o colaborador");
				$("#senhaColaborador").val("");	
			}				
			
		});		
		
		$("#addDespesa").click(function(){
			
			if($("#cod_funcao").val() != ""){
				
				var indiceProdutos = wdkAddChild('despesaTable');
				
				activeCalendarOnChildren('#dtReferenciaDesp___'+indiceProdutos);	
				
				atualizaZoomFilterTpDespesa(indiceProdutos);
				
			}else{
				alertBox("É obrigatório informar a sua função antes de incluir uma despesa!");
			}
			

		});
		
		$(document).on('click', '.dateRef', function(){
			console.log($(this)[0].id);
			var indiceDesp = $(this)[0].id.split("___")[1];
			activeCalendarOnChildren('#dtReferenciaDesp___'+indiceDesp);
		});
		
		$("#cdColaborador").prop('readonly', true);
		
		$("#cod_funcao").change(function(){
			if($("#cod_funcao") != ""){
				$("#cdColaborador").prop('readonly', false);
				limparColaborador();
				cleanChilds(["tableDespesa"]);							
				
			}else{
				$("#cdColaborador").attr('readonly', true);
				limparColaborador();
				cleanChilds(["tableDespesa"]);
			}						
		});
		
		$("#cdColaborador").blur(function(){
			
			if($("#cod_funcao").val() != ""){
			console.log("chapa_colaborador : "+this.value);
				var cdColaborador = DatasetFactory.createConstraint("chapa_colaborador", this.value, this.value, ConstraintType.MUST);
				var status_colaborador = DatasetFactory.createConstraint("status_colaborador", "1", "1", ConstraintType.MUST);				
				
				var dataset = DatasetFactory.getDataset("ds_cad_colaboradores", null, [cdColaborador,status_colaborador], null);
				
				console.log("Qtd registros retornados : "+dataset.values.length);
				if(dataset != null && dataset.values.length > 0){
					$("#nmColaborador").val(dataset.values[0].nm_colaborador);	
					$("#cod_funcao").val(dataset.values[0].cod_funcao);						
				}else{
					alertBox("Não foi possível encontrar este usuário");
					$("#cdColaborador").val("");
					$("#nmColaborador").val("");
					$("#cod_funcao").val("");
				}				
				
			}else{
				alertBox("É necessário informar a Função");
			}
			
			
		});
		
	    var date = new Date();	    
	    $('#dtSolicitacao').val(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear());
		
		$("#btnDespesa").click(function(){
			openZoom("dsTipoDespesa", "codigodespesa,"+encodeURI("Código")+",descricao,"+encodeURI("Descrição"), "codigodespesa,descricao", "tpDespesa", null);
		});
		
		$("#btnColaborador").click(function(){
			var filter = "status_colaborador,1";
			openZoom("ds_cad_colaboradores", "cod_colaborador,"+encodeURI("Código")+",chapa_colaborador,"+encodeURI("Chapa")+",nm_colaborador,"+encodeURI("Nome"), "cod_colaborador,nm_colaborador,cod_funcao,chapa_colaborador", "tpColaborador", filter);
		});		
		
		$("#btnObs").click(function(){
			openZoom("dsTipoObs", "codigoobservacao,"+encodeURI("Código")+",descricaoobservacao,"+encodeURI("Descrição"), "codigoobservacao,descricaoobservacao", "tpObs", null);
		});	
		
		$(document).on('click', '.btnZoomTipoDespesa', function(){
			INDEX = $(this).prev()[0].id.split("___")[1];
			
			cod_funcao = retornaFuncao($("#cod_funcao").val());
			var filter = cod_funcao+",on";
			console.log("filter :"+filter);
			openZoom("dsTipoDespesa", "codigodespesa,"+encodeURI("Código")+",descricao,"+encodeURI("Descrição"), "codigodespesa,descricao", "tpDespesa", filter);
		});	
		
		$(document).on('focus','.money',function(){
			$('.money').mask('#00.000.000.000,00',{reverse: true});
		});		
		
		$(document).on('blur','.sumField',function(){
			sumFields();
		});
		
		$(document).on('click','.deleteField',function(){
			sumFields();
		});		

	}
	
	if(CURRENT_STATE != INICIO_0 && CURRENT_STATE != INICIO){
				
		$("#senhaColaborador").val("");
	}
	
	if(CURRENT_STATE == ATIVIDADE_GESTOR){
		
		$("#decisaoGestor").val("");
		$("#text_ObsGestor").val("");
		
		$("#decisaoGestor").change(function(){
			
			if(this.value == "reprovado"){
				setRequiredCustom("text_ObsGestor", true);
			}else{
				setRequiredCustom("text_ObsGestor", false);
			}
				
		});
		
		$(".btnObsGestor").click(function(){
			var filter = "aprovadorComercial,on";
			openZoom("ds_cad_obs_padroes", "codigo_obs,"+encodeURI("Código")+",ds_obs,"+encodeURI("Descrição"), "codigo_obs,ds_obs", "tpObsGestor", filter);
			
		});
			
	}
	
	if(CURRENT_STATE == ATIVIDADE_DP){
		
		$("#decisaoDP").val("");
		$("#text_ObsDP").val("");
		
		$("#decisaoDP").change(function(){
			
			if(this.value == "reprovado"){
				setRequiredCustom("text_ObsDP", true);
			}else{
				setRequiredCustom("text_ObsDP", false);
			}
				
		});
		
		$(".btnObsDP").click(function(){
			var filter = "aprovadorRH,on";
			openZoom("ds_cad_obs_padroes", "codigo_obs,"+encodeURI("Código")+",ds_obs,"+encodeURI("Descrição"), "codigo_obs,ds_obs", "tpObsDP", filter);
			
		});		
			
	}	
	
	
/*	if(CURRENT_STATE == APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE || CURRENT_STATE == ALTERAR_REQUISICAO){		
		$("[name='aprovaRadio']").prop('checked', false);	
		$("#motivoAprova").val("");
	}*/
	
}

function openZoom(datasetId, columns, fieldsToReturn, type, filter){
	window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields="
			+ columns + "&resultFields=" + fieldsToReturn + "&type=" + type
			+ (filter != null ? "&filterValues=" + filter : ""), "zoom",
			"status, scrollbars=no, width=600, height=350, top=0, left=0");
}

function isUserOfGroup(groupId){
	var user = parent.WCMAPI.getUserCode();
	var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, [groupFilter], null);
	for(var i=0;i<dataset.values.length;i++){
		if(dataset.values[i]["colleagueGroupPK.colleagueId"] == user)
			return true;
	}
	return false;
}

function getUsersFromSelectedGroup(){
	var groupId = $("#codigoArea").val();
	var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, [groupFilter], null);
	return dataset.values;
}

function getManagementGroups(){
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return {core: dataset.values[0].nucleo, executive : dataset.values[0].executivo};
}

function setSelectedZoomItem(item){	
	
	if(item.type == "tpDespesa"){				
		//$("#tpCodDespesas").val(item.codigodespesa);
		$("#text_tipo_despesa___"+INDEX).val(item.descricao);		
	}
	if(item.type == "tpObs"){
		$("#txtCodTipoObs").val(item.codigoobservacao);
		$("#txtTipoObs").val(item.descricaoobservacao);
	}
	if(item.type == "tpColaborador"){
		$("#cdColaborador").val(item.chapa_colaborador);
		$("#nmColaborador").val(item.nm_colaborador);
		$("#cod_funcao").val(item.cod_funcao);
	}
	if(item.type == "grupoProduto"){
		$("#idGrupoProdServico___"+INDEX).val(item.CODIGO);
		$("#textGrupoProdServico___"+INDEX).val(item.DESCRICAO);
	}
	if(item.type == "produto"){
		$("#idCodProdServico___"+INDEX).val(item.PROD);
		$("#textCodProdServico___"+INDEX).val(item.DESCRICAO);
		$("#text_unidadeMedida___"+INDEX).val(item.UM);
		$("#id_unidadeMedida___"+INDEX).val(item.UM);
		$("#id_armazemProd___"+INDEX).val(item.ARMAZEM);
		$("#text_armazemProd___"+INDEX).val(item.DESCARMAZEM);
	}
	if(item.type == "armazem"){
		$("#id_armazemProd___"+INDEX).val(item.CODIGO);
		$("#text_armazemProd___"+INDEX).val(item.DESCRICAO);
	}
	if(item.type == "un"){
		$("#id_unidadeMedida___"+INDEX).val(item.UNIMED);
		$("#text_unidadeMedida___"+INDEX).val(item.DESCPO);
	}
	if(item.type == "requisicoes"){				
		$("#zoom_requisicaoMaterial").val(item.numFluig);
		getDadosRequisicao();
	}
	if(item.type == "tpObsGestor"){
		$("#text_ObsGestor").val(item.ds_obs);
	}
	if(item.type == "tpObsDP"){
		$("#text_ObsDP").val(item.ds_obs);
	}	
}


function alertBox(msg){
	FLUIGC.message.alert({
	    message: msg,
	    title: 'Atenção!',
	    label: 'OK'
	});
}

function retornaFuncao(codigo){
	if(codigo == "1"){
		return "supervisor";
	}
	if(codigo == "2"){
		return "promotor";
	}
	if(codigo == "3"){
		return "representante";
	}	
}

function sumFields(){
	var sum = numeral();
	$('.sumField').each(function(){
		sum.add(numeral(this.value));
	});
	$("#vl_total").val(sum.format('0,0.00'));
	
}

function numeralLoad(){
	numeral.language('br',{
	    delimiters: {
	        thousands: '.',
	        decimal: ','
	    },
	    abbreviations: {
	        thousand: 'k',
	        million: 'm',
	        billion: 'b',
	        trillion: 't'
	    },
	    ordinal : function (number) {
	        return number === 1 ? 'er' : 'ok';
	    },
	    currency: {
	        symbol: 'R$'
	    }
	});
	numeral.language('br');
}

function limparColaborador(){
	
	$("#cdColaborador").val("");
	$("#nmColaborador").val("");
	$("#senhaColaborador").val("");
	
}

function cleanChilds(tables) {

    for (var i in tables) {

        $('#' + tables[i]).find('td').each(function(index) {

            if (index > 0) {
                fnWdkRemoveChild(this);
            }
        });
    }
}

function atualizaZoomFilterTpDespesa(index){ 

	var cod_funcao = retornaFuncao($("#cod_funcao").val());	
		cod_funcao = cod_funcao + ",on";
		console.log("cod_funcao : "+cod_funcao);
		console.log("text_tipo_despesa___ : "+index);
	reloadZoomFilterValues("text_tipo_despesa___"+index, cod_funcao);	    
   
} 