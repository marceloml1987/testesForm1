function validateForm(form){
	
	var msg = "";
	
	if(form.getValue("cod_colaborador") == ""){
		msg = msg + "Favor informar o código do colaborador </br>";
	}
	
	if(form.getValue("nm_colaborador") == ""){		
		msg = msg + "Favor informar o nome do colaborador </br>";
	}	
	
	if(form.getValue("cod_senha") == ""){		
		msg = msg + "Favor informar a senha do colaborador </br>";
	}	
	
	if(form.getValue("nm_email") == ""){		
		msg = msg + "Favor informar o e-mail do colaborador </br>";
	}	
	
	if(form.getValue("cod_funcao") == ""){		
		msg = msg + "Favor informar função do colaborador </br>";
	}		
	
	if(form.getValue("status_colaborador") == ""){		
		msg = msg + "Favor informar o status do colaborador </br>";
	}		
	
	if(msg != ""){
		throw msg;
	}
	
	var document_id = form.getDocumentId();
	
	var c1 = DatasetFactory.createConstraint("cod_colaborador", form.getValue("cod_colaborador"), form.getValue("cod_colaborador"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("cod_funcao", form.getValue("cod_funcao"), form.getValue("cod_funcao"), ConstraintType.MUST);
	var contraintActive          = DatasetFactory.createConstraint("metadata#active", "1", "1", ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);	
	
	var constraints = new Array(c1,c2,c3,contraintActive);
	var dataset = DatasetFactory.getDataset("ds_cad_colaboradores", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {
		throw "Já existe um colaborador com esta matrícula";
	}	
	
	var contraintDescTipoDespesa = DatasetFactory.createConstraint("nm_email", form.getValue("nm_email"), form.getValue("nm_email"), ConstraintType.MUST);
	var contraintActive          = DatasetFactory.createConstraint("metadata#active", "1", "1", ConstraintType.MUST);
	var contraintCodTipoDespesa = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);
	
	var constraints = new Array(contraintDescTipoDespesa,contraintCodTipoDespesa,contraintActive);
	var dataset = DatasetFactory.getDataset("ds_cad_colaboradores", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {
		throw "Já existe um colaborador com este e-mail";
	}	
	
	var contraintDescTipoDespesa = DatasetFactory.createConstraint("chapa_colaborador", form.getValue("chapa_colaborador"), form.getValue("chapa_colaborador"), ConstraintType.MUST);
	var contraintStatus          = DatasetFactory.createConstraint("status_colaborador", "1", "1", ConstraintType.MUST);
	var contraintActive          = DatasetFactory.createConstraint("metadata#active", 1, 1, ConstraintType.MUST);
	var contraintCodTipoDespesa = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);
	
	var constraints = new Array(contraintDescTipoDespesa,contraintCodTipoDespesa,contraintStatus,contraintActive);
	var dataset = DatasetFactory.getDataset("ds_cad_colaboradores", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {		
		throw "Já existe um colaborador ativo com esta chapa";
	}		
	
}