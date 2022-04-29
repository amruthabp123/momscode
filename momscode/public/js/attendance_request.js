// frappe.ui.form.on("Attendance Request",{
//     employee:function(frm){
//         if(frm.doc.employee){
//             frappe.call({
//                 method:"momscode.doc_events.attendance_request.ss",
//                 args:{
//                     "item1":frm.doc.employee
//                 },
//                 callback:function(r){
//                     frm.doc.basic=r.message
//                     console.log(r.message)
//                     frm.refresh_field("basic")
//                 }
//             })
//         }
//     }
// });
frappe.ui.form.on("Attendance Request",{
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
                   //frm.refresh_field("basic")
                   
                    //frm.refresh_field("salary_structure")
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
    from_date: function () {
        cur_frm.doc.to_date = cur_frm.doc.from_date
        cur_frm.refresh_field("to_date")
    },
    overtime_hour: function () {
        cur_frm.doc.overtime_allowance=(cur_frm.doc.basic / (30 * 8)) * cur_frm.doc.overtime_hour * cur_frm.doc.overtime_multiplication_factor
            cur_frm.refresh_field("overtime_allowance")
    
        }
    

});




   
   
    

   
    






