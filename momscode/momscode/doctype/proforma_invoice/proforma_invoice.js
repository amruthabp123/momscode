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
		
		},
	terms:function(frm){
		frm.add_fetch('terms','terms','terms_and_conditions_details')
	},
	sales_order_number:function(frm){
		if(frm.doc.sales_order_number){
			frm.clear_table('items');
			frappe.model.with_doc("Sales Order",frm.doc.sales_order_number,function(){
				let sales=frappe.model.get_doc("Sales Order",frm.doc.sales_order_number)
				let total=0;
				for(let i=0;i<sales.items.length;i++){
					var row=frm.add_child('items');
					row.item_code=sales.items[i].item_code;
					row.quantity=sales.items[i].qty;

					// row.operation_time_in_minutes=rout.operations[i].time_in_mins;
					// row.workstation=rout.operations[i].workstation;
					// row.net_hour_rate=rout.operations[i].hour_rate;
					// row.operating_cost=rout.operations[i].operating_cost;
					// total += row.operating_cost;
					//    frm.set_value('total_operational_cost', total);
					// refresh_field('total_operational_cost')
					

				}
				cur_frm.refresh_field(items);


			})

		}
	},

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

