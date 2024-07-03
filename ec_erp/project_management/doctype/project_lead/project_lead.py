# Copyright (c) 2024, ECMDC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document




class ProjectLead(Document):
    pass  # No changes needed here

@frappe.whitelist()

def create_project(client_name, expected_bid_cost, category, role_of_firm, firm_share, location, bd_remarks, director_remarks, jv_partner, description, project_cost, consultancy_fees ):
    # Get the name of the current Project Lead document
    project_lead_name = frappe.get_value("Project Lead", {"name": frappe.form_dict["docname"]}, "name")
    
    if project_lead_name:
        # Check if a Project with this Lead already exists
        if not frappe.db.exists("Project", {"project_lead": project_lead_name}):
            # Create a new Project document
            project = frappe.new_doc("Project")
            project.client_name = client_name
            project.expected_bid_cost = expected_bid_cost
            project.description = description
            project.project_cost = project_cost
            project.jv_partner = jv_partner
            project.category = category
            project.role_of_firm = role_of_firm
            project.firm_share = firm_share
            project.location = location
            project.bd_remarks = bd_remarks 
            project.director_remarks = director_remarks
            project.consultancy_fees = consultancy_fees
            project.project_lead = project_lead_name  # Use the lead name as reference
            project.project_name = frappe.form_dict["docname"]  # Set the project_name field
            
            project.insert(ignore_permissions=True)
            return True
    return False






