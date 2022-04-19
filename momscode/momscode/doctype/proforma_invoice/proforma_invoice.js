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
	// setup: function(frm) {
	// 	frm.add_fetch('customer','primary_address','customer_address');
	// 	frm.add_fetch('customer','customer_primary_contact','contact_person');
	// 	frm.add_fetch('customer','mobile_no','mobile_number');
	// 	frm.add_fetch('customer','email_id','contact_email');
		
	// 	},
	terms:function(frm){
		frm.add_fetch('terms','terms','terms_and_conditions_details')
	},
	// sales_order_number:function(frm){
	// 	if(frm.doc.sales_order_number){
	// 		frm.clear_table('items');
	// 		frappe.model.with_doc("Sales Order",frm.doc.sales_order_number,function(){
	// 			let sales=frappe.model.get_doc("Sales Order",frm.doc.sales_order_number)
	// 			var total=0;
	// 			var q=0;
	// 			for(let i=0;i<sales.items.length;i++){
	// 				var row=frm.add_child('items');
	// 				row.item_name=sales.items[i].item_code;
	// 				row.qty=sales.items[i].qty;
	// 				row.uom=sales.items[i].uom;
	// 				row.rate=sales.items[i].rate;
	// 				row.amount=sales.items[i].amount;
	// 				q+=row.qty;
	// 				frm.set_value('total_quantity',q);
	// 				refresh_field(total_quantity);
	// 				total += row.amount;
	// 				frm.set_value('total', total);
	// 				refresh_field(total)
					

	// 			}
	// 			frm.set_value('total', total);
	// 			cur_frm.refresh_field(total);
	// 			frm.set_value('total_quantity',q)
	// 			cur_frm.refresh_field(total_quantity);
	// 			cur_frm.refresh_field(items);


	// 		})

	// 	}
	// },
	// qty: function(frm, cdt, cdn) {
    //     var d = locals[cdt][cdn]
    //      //d.qty = d.qty * d.uom
    //     d.amount = d.qty * d.rate
	// 	cur_frm.refresh_field(d.parentfield)
	// }


});
// frappe.ui.form.on("Momsitem", {
// 	item_name: function(frm,cdt,cdn) {
// 		var row = locals[cdt][cdn];
// 		if (frm.doc.sales_order_number) {
// 			refresh_field("item_name", cdn, "items");
// 		}
// 	 	else {
// 			 frm.script_manager.copy_from_first_row("items", row);
// 			}
// 	}
// });


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
