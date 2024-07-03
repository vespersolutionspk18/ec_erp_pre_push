frappe.ui.form.on("Project", {
	start_date(frm) {
	    frm.set_value('project_name', "");
	    var date_value = frm.doc.start_date;
	    var proj_year="";
        if(date_value) {
            // Create a Date object from the date value
            let date_object = new Date(date_value);

            // Extract the year
            let year = date_object.getFullYear();

            // Convert the year to a string if needed
            let year_string = year.toString();

          

            // If you need to set the year to another field in your form
            proj_year=year_string;
        }
	    
	    
	    
        var proj_cat=frm.doc.category;
        var proj_client=frm.doc.client_name;
        var savename= proj_cat +"/"+ proj_client+"/" + proj_year;
        frm.set_value('project_name', savename);
	},
		client_name(frm) {
	    frm.set_value('project_name', "");
	    var date_value = frm.doc.start_date;
	    var proj_year="";
        if(date_value) {
            // Create a Date object from the date value
            let date_object = new Date(date_value);

            // Extract the year
            let year = date_object.getFullYear();

            // Convert the year to a string if needed
            let year_string = year.toString();

          

            // If you need to set the year to another field in your form
            proj_year=year_string;
        }
	    
	    
	    
        var proj_cat=frm.doc.category;
        var proj_client=frm.doc.client_name;
        var savename= proj_cat +"/"+ proj_client+"/" + proj_year;
        frm.set_value('project_name', savename);
	},
	category(frm) {
	    frm.set_value('savename', "");
	    var date_value = frm.doc.start_date;
	    var proj_year="";
        if(date_value) {
            // Create a Date object from the date value
            let date_object = new Date(date_value);

            // Extract the year
            let year = date_object.getFullYear();

            // Convert the year to a string if needed
            let year_string = year.toString();

          

            // If you need to set the year to another field in your form
            proj_year=year_string;
        }
	    
	    
	    
        var proj_cat=frm.doc.category;
        var proj_client=frm.doc.client_name;
        var savename= proj_cat +"/"+ proj_client+"/" + proj_year;
        frm.set_value('project_name', savename);
	},
    refresh: function(frm){   // I have used refresh you can use any trigger
        frm.clear_table('deliverables');
        frappe.call({
        method:"frappe.client.get_list",
        args:{
            doctype:"Deliverable",
            filters: [
                ["project","=", frm.doc.project_name]  // You can set any filter you want
            ],
        		fields:["start_date", "end_date", "description", "deliverable_status", "deliverable_cost"] 
    		},
    		callback: function (response) {
        	if (response.message) {
            	$.each(response.message, function(i,row) {   // row can be anything, it is merely a name
            		    var child_add = cur_frm.add_child("deliverables");  // child_add can be anything
		        		child_add.start_date = row.start_date;
		        		child_add.end_date = row.end_date;
                        child_add.description = row.description;
                        child_add.deliverable_status = row.deliverable_status;
                        child_add.deliverable_cost = row.deliverable_cost; // you can add as many fields as you want
              	        console.log(response.message);     // not really necessary just so you can view the message in the console to check for possible errors               
							});
          frm.refresh_fields("deliverables");
        	}
    		}
			});
		},
    validate(frm){
        if (frm.doc.start_date >= frm.doc.end_date){
            frappe.throw(__('Project End Date should be greater than Start Date'));
        }
    }
	
 });
