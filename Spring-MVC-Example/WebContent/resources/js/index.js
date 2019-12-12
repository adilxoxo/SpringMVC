function loadTable() {
		$.ajax({url: "getData",type: "POST",
	  dataType: 'json',
		  contentType : "application/json",
		 success: function(result){
			 console.log(result)
			$$("myTable").clearAll();
			$$("myTable").parse(result);
		}});
	}
	
	function submitData() {
		var formData = $$("idDataForm").getValues();
		var url;
		if(formData.key == undefined){
			url = "setData";
		}else{
			url = "updateUser";
		}
		
		$.ajax({url:url,type: "POST",
		data : JSON.stringify(formData),
	  dataType: 'json',headers: {
			'Content-Type': 'application/json; charset=utf8'
		}, success: function(result){
			$$("idDataForm").clear();
			loadTable();
		}});
	}
	
	function clearTable() {
		$.ajax({url: "clearData",type: "POST",
	  dataType: 'json',headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}, success: function(result){
			loadTable();
		}});
	}

	webix.ui({
	width:700,
	view:"form",
	id : "idDataForm",
    elements:[{
	rows : [{
			view : "text",
			name : "name",
			label : "Name",
			labelWidth : 150,
		},
		{
			view : "text",
			name : "lastname",
			label : "Last Name",
			labelWidth : 150,
		},{
			view : "button",
			label : "Submit",
			on : {
				"onItemClick" : function(){
					submitData();
				}
			}
		},{
		view:"datatable",
		id : "myTable",
		width : 700,
		height:500,
		scrollY : true,
		select:true,
		scheme:{
			$init:function(obj){ obj.index = this.count(); }
		},
		columns:[
			{ id:"index",   header:"",           sort:"int"},
			{ id:"key",    header:"Key",              width:50},
			{ id:"name",   header:"Name",    width:200},
			{ id:"lastname",    header:"Last Name",      width:200},
			{ id: "delete", header:"",template: "<button class='delete_button'>Delete</button>",width:100}
		],
		onClick:{
			delete_button: function(ev, id){
				var rowData = this.getItem(id);
				var self = this;
				$.ajax({url: "deleteData",type: "POST",
					data : JSON.stringify(rowData),
					dataType: 'json',headers: {
					'Content-Type': 'application/json; charset=utf8'
					}, success: function(result){
						self.remove(id);
						$$("idDataForm").clear();
					}
				});
				
			}
		},
		on : {
			onItemClick : function(){
				var item = $$("myTable").getSelectedItem();
				$$("idDataForm").parse(item);
			}
		}
	},{
		cols : [{
			view : "button",
			label : "Drop Table",
			on : {
				"onItemClick" : function(){
					//submitData();
				}
			}
		},{
			view : "button",
			label : "Clear Table",
			on : {
				"onItemClick" : function(){
					clearTable();
				}
			}
		}]
	}] }]
	});
	
	loadTable();