
frappe.ui.form.on("Attendance Request",{
    //fetch the values from Salary structure assignment and employee doctype when select the the field employee 
    employee:function(frm){
        if(frm.doc.employee){
            frappe.call({
                method:"momscode.doc_events.attendance_request.ss",
                args:{
                    "item1":frm.doc.employee
                },
                callback:function(r){
                    frm.doc.salary_structure=r.message[0]
                    frm.doc.basic=r.message[1]
                    console.log(r.message)
                    cur_frm.refresh_fields(["salary_structure", "basic"])
                }
            })
            frappe.call({
				method:"momscode.doc_events.attendance_request.otm_factor",
				args:{
					"empcode":frm.doc.employee
				},
				callback:function(r){
                    frm.doc.overtime_multiplication_factor=r.message
                    cur_frm.refresh_field("overtime_multiplication_factor")
                }
            })
        }
    },
    //set the value in todate field when selecting the from date
    from_date: function () {
        cur_frm.doc.to_date = cur_frm.doc.from_date
        cur_frm.refresh_field("to_date")
    },
    //calculation to find out the overtime allowance
    overtime_hour: function () {
        cur_frm.doc.overtime_allowance=(cur_frm.doc.basic / (30 * 8)) * cur_frm.doc.overtime_hour * cur_frm.doc.overtime_multiplication_factor
            cur_frm.refresh_field("overtime_allowance")
    
        }
    

});




   
   
    

   
    






