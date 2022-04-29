import frappe
# @frappe.whitelist()
# def ss(item1):
# 	data1 = frappe.db.sql(""" SELECT base FROM `tabSalary Structure Assignment` WHERE employee=%s""",item1, as_dict=1)
# 	if data1:
# 		return data1[0].base

# 	else:
# 		return "0"
@frappe.whitelist()
def ss(item1):
	data1 = frappe.db.sql(""" SELECT base,salary_structure FROM `tabSalary Structure Assignment` WHERE employee=%s""",item1, as_dict=1)
	return data1[0].salary_structure if len(data1) > 0 else "", data1[0].base if len(data1) > 0 else ""

@frappe.whitelist()
def test(item):
	data=frappe.db.sql("""SELECT c.department FROM `tabEmployee` c WHERE c.name=%s""",(item),as_dict=1)
	return data[0]
@frappe.whitelist()
def otm_factor(empcode):
	data2=frappe.db.sql("""SELECT overtime_multiplication_factor FROM `tabEmployee` WHERE name=%s""",(empcode),as_dict=1)
	if data2:
		return data2[0]. overtime_multiplication_factor
	else:
		return "0"



