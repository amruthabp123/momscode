// Copyright (c) 2022, Momscode and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Order', {
    refresh:  function(frm)   {
        if(cur_frm.doc.docstatus==1){
            cur_frm.add_custom_button(__('Proforma Invoice'), () =>  frappe.set_route("Form", "Proforma Invoice"), __('Create'));
            
            frappe.model.open_mapped_doc({
                method: "erpnext.selling.doctype.sales_order.sales_order.doc.proforma_invoice",
                frm: this.frm
            })
        }
      
        
    //    frm.add_custom_button(__('Proforma Invoice'), () => this.make_proforma_invoice(), __('Create'));
       
            
    }
});

   
