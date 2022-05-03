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
	terms:function(frm){
		frm.add_fetch('terms','terms','terms_and_conditions_details')
	},
});
frappe.ui.form.on("Momsitem", "rate", function(frm, cdt, cdn) {//assign amount to the amount column by multiply rate*qty
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype,d.name,"amount",d.rate*d.qty); //qty is changed the amount value is also changed
    var total = 0; // The total value of amount in each row is assign to raw_material_cost field of parent table
    frm.doc.items.forEach(function(d) { total += d.amount; });
    frm.set_value('total', total);
	cur_frm.refresh_field(total)
	var q=0;
	frm.doc.items.forEach(function(d) { q += d.qty; });
    frm.set_value('total_quantity', q);
    cur_frm.refresh_field(total_quantity);


});
frappe.ui.form.on("Momsitem", "qty", function(frm, cdt, cdn) {//assign amount to the amount column by multiply rate*qty
    var d = locals[cdt][cdn];
    frappe.model.set_value(d.doctype,d.name,"amount",d.rate*d.qty); //qty is changed the amount value is also changed
    var total = 0; // The total value of amount in each row is assign to raw_material_cost field of parent table
    frm.doc.items.forEach(function(d) { total += d.amount; });
    frm.set_value('total', total);
	cur_frm.refresh_field(total)
	var q=0;
	frm.doc.items.forEach(function(d) { q += d.qty; });
    frm.set_value('total_quantity', q);
    cur_frm.refresh_field(total_quantity);
});
