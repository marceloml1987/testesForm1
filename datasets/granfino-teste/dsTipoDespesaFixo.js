function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("codigodespesa");
	dataset.addColumn("descricao");
	dataset.addColumn("promotor");
	dataset.addColumn("representante");
	dataset.addColumn("supervisor");
	
	dataset.addRow(new Array(1,"Passagem","on","",""));
	dataset.addRow(new Array(2,"Sedex","on","",""));
	dataset.addRow(new Array(3,"Diversos","on","","on"));
	dataset.addRow(new Array(4,"Combustíveis","","","on"));
	dataset.addRow(new Array(5,"Estacionamento","on","","on"));
	dataset.addRow(new Array(6,"Pedágio","on","","on"));
	
	return dataset;

}