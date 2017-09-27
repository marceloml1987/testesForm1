function displayFields(form,customHTML){ 
	
	if(form.getFormMode() == "ADD"){
		form.setEnabled('codigodespesa', false);
	    //Define os campos para ordenação
	    var sortingFields = new Array("documentid");		
		var dataset = DatasetFactory.getDataset("dsTipoDespesa", new Array(), new Array(), sortingFields);
		
		log.info("###dataset.getRowsCount : "+dataset.getRowsCount());
		
		var id_tipo_despesa;
		if(dataset.getRowsCount() == 0){
			id_tipo_despesa = 1;
			form.setValue('codigodespesa', id_tipo_despesa);		
		}else{
			var ultimo_registro = dataset.getRowsCount() - 1;
			
			log.info("###ultimo_registro : "+ultimo_registro);
			
			id_tipo_despesa = dataset.getValue(ultimo_registro, "codigodespesa");
			log.info("último de id_tipo_despesa :"+id_tipo_despesa);
			id_tipo_despesa = parseInt(id_tipo_despesa);
			id_tipo_despesa = id_tipo_despesa + 1; 
			log.info("###id_tipo_despesa : "+id_tipo_despesa);
			form.setValue('codigodespesa', id_tipo_despesa);			
		}


	}

	if(form.getFormMode() == "MOD"){
		form.setEnabled('codigodespesa', true);
	}		
	
}