// Copyright (c) 2024, ECMDC and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Project Lead", {
    refresh: function(frm) {
        // Get the value of the project_name field
        var new_name = frm.doc.project_name;

        // Validate the new_name value
        if (new_name && new_name !== frm.doc.name) {
            // Call the Frappe API to rename the document
            frappe.call({
                method: 'frappe.client.rename_doc',
                args: {
                    doctype: 'Project Lead',
                    old_name: frm.doc.name,
                    new_name: new_name,
                    merge: false
                },
                callback: function(response) {
                    if (response.message) {
                        frappe.msgprint(__('Document name changed successfully.'));
                        // Reload the form to reflect the changes
                        frm.reload_doc();
                        window.location.href = '/app/project-lead';
                    } else {
                        frappe.msgprint(__('Failed to change document name.'));
                    }
                }
            });
        }
    },
    category(frm) {
	    frm.set_value('project_name', "");
	    var date_value = frm.doc.submission_date;
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
        frm.set_value('name', project_name);
	},
    submission_date(frm) {
	    frm.set_value('project_name', "");
	    var date_value = frm.doc.submission_date;
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
        frm.set_value('name', project_name);
	},
client_name(frm) {
	    frm.set_value('project_name', "");
	    var date_value = frm.doc.submission_date;
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
        frm.set_value('name', project_name);
	},

    stage: function(frm) {
        if (frm.doc.stage === "Proposal") {
            // Call the server-side method to create a new Project
  


            frappe.call({
                method: 'ec_erp.project_management.doctype.project_lead.project_lead.create_project',
                args: {
                    client_name: frm.doc.client_name,
                    expected_bid_cost: frm.doc.expected_bid_cost,
                     description: frm.doc.description,
                     project_cost: frm.doc.project_cost,
                       jv_partner: frm.doc.jv_partner,
                       category: frm.doc.category,
                       role_of_firm: frm.doc.role_of_firm,
                       firm_share: frm.doc.firm_share,
                       location: frm.doc.location,
                       bd_remarks: frm.doc.bd_remarks,
                       consultancy_fees: frm.doc.consultancy_fees,
                       director_remarks: frm.doc.director_remarks,
                   docname: frm.docname  // 
                    },
                docname: frm.docname,  // Pass the docname parameter
                callback: function(response) {
                    if (response.message) {
                        frappe.msgprint(__('Project created for Lead: {0}', [frm.doc.name]));
                    }
                }
            });


        }
    },

    
    
});
