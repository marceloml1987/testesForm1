function validateForm(form){
	
	var msg = "";
	
	if(form.getValue("codigodespesa") == ""){
		msg = msg + "Favor informar o código da despesa </br>";
	}
	
	if(form.getValue("descricao") == ""){		
		msg = msg + "Favor informar a descrição do colaborador </br>";
	}		
	log.info("###promotor : '"+form.getValue("promotor"))+"'";
	if(form.getValue("supervisor") == null && form.getValue("promotor") == null && form.getValue("representante") == null){		
		msg = msg + "Favor informar ao menos uma função </br>";
	}		
	
	if(msg != ""){
		throw msg;
	}
	
	var document_id = form.getDocumentId();
	
	var c1 = DatasetFactory.createConstraint("codigodespesa", form.getValue("codigodespesa"), form.getValue("codigodespesa"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);	
	
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("dsTipoDespesa", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {
		throw "Já existe uma despesa com este código";
	}	
	
	var contraintDescTipoDespesa = DatasetFactory.createConstraint("descricao", form.getValue("descricao"), form.getValue("descricao"), ConstraintType.MUST);
	var contraintCodTipoDespesa = DatasetFactory.createConstraint("documentid", document_id, document_id, ConstraintType.MUST_NOT);
	
	var constraints = new Array(contraintDescTipoDespesa,contraintCodTipoDespesa);
	var dataset = DatasetFactory.getDataset("dsTipoDespesa", new Array(), constraints, new Array());
	
	log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
	
	for(var i=0; i < dataset.getRowsCount(); i++) {
		throw "Já existe uma despesa com esta descrição";
	}	
	
}