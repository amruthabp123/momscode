
frappe.ui.form.on("Sales Order", "refresh", function(frm){
    if(cur_frm.doc.docstatus == 1) {
      frm.add_custom_button(__("Proforma Invoice"), function() {
        frappe.model.open_mapped_doc({
                        method : "momscode.doc_events.sales_order.make_proforma_invoice",
                        frm : cur_frm
                })
         },__('Create'));
    }
});

 
  
