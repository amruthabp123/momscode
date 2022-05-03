# to create proforma invoice against the sales order
import frappe
from frappe.model.mapper import get_mapped_doc
@frappe.whitelist()
def make_proforma_invoice(source_name, target_doc=None):
	return _make_proforma_invoice(source_name,target_doc)
def _make_proforma_invoice(source_name,target_doc=None):
	# def set_missing_values(source,target):
	# 	if customer:
	# 		target.customer=customer.name
	# 		target.customer_name=customer.customer_name
	# 	target.run_method("set_missing_values")
	doclist=get_mapped_doc("Sales Order",source_name,{
		"Sales Order":{
			"doctype":"Proforma Invoice",
			"validation":{
				"docstatus":["=",1]
			}
		},
		"Sales Order Item":{
			"doctype":"Momsitem",
			"field_map":{
				
				"item_code":"item",
				"uom":"uom",
				"qty":"qty",
				"rate":"rate",
				"amount":"amount" 
			
			}
		},
		"Sales Order":{
			"doctype":"Proforma Invoice",
			"field_map":{
				"company_address_display":"customer_address",
				"contact_person":"contact_person",
				# "contact_mobile":"mobile_number",
				"contact_phone":"mobile_number",
				"contact_email":"contact_email",
				"total_qty":"total_quantity"
			}
		}
	},target_doc)
	return doclist