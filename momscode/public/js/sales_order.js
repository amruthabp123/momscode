// Copyright (c) 2022, Momscode and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Order', {
    refresh:  function(frm)   {
        if(cur_frm.doc.docstatus){
            cur_frm.add_custom_button(__('Proforma Invoice'), () =>  frappe.set_route("Form", "Proforma Invoice"), __('Create'));
        }
    //    frm.add_custom_button(__('Proforma Invoice'), () => this.make_proforma_invoice(), __('Create'));
       
            
    }
});