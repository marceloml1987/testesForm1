function validateForm(form){
	
	var msg = "";
	var quebra = "</br>"
	
	if(form.getValue("codigo_obs") == ""){
		msg = msg + "Favor informar o código da observação "+quebra;
	}
	
	if(form.getValue("ds_obs") == ""){		
		msg = msg + "Favor informar a descrição da observação "+quebra;
	}			
	
	var document_id = form.getDocumentId();
	
	var c1 = DatasetFactory.createConstraint("codigo_obs", form.getValue("codigo_obs"), form.getValue("codigo_obs"), ConstraintType.MUST);
	var contraintActive          = DatasetFactory.createConstraint("metadata#active", "1", "1", ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);	
	
	var constraints = new Array(c1,c3,contraintActive);
	var dataset = DatasetFactory.getDataset("ds_cad_obs_padroes", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {
		msg = msg + "Já existe uma observação com este código"+quebra;
	}
	
	var contraintDescTipoObs = DatasetFactory.createConstraint("ds_obs", form.getValue("ds_obs"), form.getValue("ds_obs"), ConstraintType.MUST);
	var contraintActive          = DatasetFactory.createConstraint("metadata#active", "1", "1", ConstraintType.MUST);
	var contraintCodTipoObs = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);
	
	var constraints = new Array(contraintDescTipoObs,contraintCodTipoObs,contraintActive);
	var dataset = DatasetFactory.getDataset("ds_cad_obs_padroes", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {
		msg = msg + "Já existe uma observação com esta descrição"+quebra;
	}	
	
	if(msg != ""){
		throw msg;
	}		
	
}