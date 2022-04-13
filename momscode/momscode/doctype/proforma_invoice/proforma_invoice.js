// Copyright (c) 2022, Momscode and contributors
// For license information, please see license.txt

frappe.ui.form.on('Proforma Invoice', {
	 refresh: function(frm) {
		frm.set_value("date",frappe.datetime.add_days(frappe.datetime.nowdate()));

	 },
	 onload:function(frm,cdt,cdn){	
		frm.set_query('uoms','items',()=>{
			return{
				filters:{
					uom:["=","Nos"]
				}
			}
		})
	},
	setup: function(frm) {
		frm.add_fetch('customer','primary_address','shipping_address');
		frm.add_fetch('customer','customer_primary_address','customer_address');
		frm.add_fetch('customer','mobile_no','mobile_number');
		frm.add_fetch('customer','email_id','contact_email');
		
		}

});
frappe.ui.form.on("Sales Order Item ", "item_code", function(frm, cdt, cdn) {//assign amount to the amount column by multiply rate*qty	
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype,d.name,"qty",1); //qty is changed the amount value is also changed
	// var tota = 0; // The total value of amount in each row is assign to raw_material_cost field of parent table
	// frm.doc.items.forEach(function(d) { tota += d.amount; });
	// frm.set_value('total', tota);
	// refresh_field('total')

});
frappe.ui.form.on("Sales Order Item", "rate", function(frm, cdt, cdn) {//assign amount to the amount column by multiply rate*qty
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype,d.name,"amount",d.rate*d.qty); //qty is changed the amount value is also changed
    var total = 0; // The total value of amount in each row is assign to raw_material_cost field of parent table
    frm.doc.items.forEach(function(d) { total += d.amount; });
    frm.set_value('total', total);
	var q=0;
	frm.doc.items.forEach(function(d) { q += d.qty; });
    frm.set_value('total_quantity', q);
    

});

