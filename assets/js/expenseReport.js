var ExpenseReportModal = new bootstrap.Modal(document.getElementById('expenseReportModal')); 

function closeExpenseReportModal(){
    ExpenseReportModal.hide();
} 

function getExpenseReport(){

    DailyExpenses();
    WeeklyExpenses();
    MonthlyExpenses();
    ExpenseReportModal.show();    
}


function expenseDownload(){
    axios.get("http://localhost:5000/downloadExpenses", {headers: {"Authorization":token}})
    .then((response)=> {

        if(response.status == 201){
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        }else{
            throw new Error(response.data.message);
        }

    }).catch((error)=>console.log(error))
}


function DailyExpenses(){

    axios.get("http://localhost:5000/getDailyExpenses", {headers: {"Authorization":token}})
      .then(res =>{
            console.log(res.data);
            showDailyExpenses(res.data)
             
      })
      .catch(error=>console.error(error))


}

function WeeklyExpenses(){

axios.get("http://localhost:5000/getWeeklyExpenses", {headers: {"Authorization":token}})
  .then(res =>{
        console.log(res.data);
        showWeeklyExpenses(res.data)
         
  })
  .catch(error=>console.error(error))


}


function MonthlyExpenses(){

axios.get("http://localhost:5000/getMonthlyExpenses", {headers: {"Authorization":token}})
  .then(res =>{
        console.log(res.data);
        showMonthlyExpenses(res.data)
         
  })
  .catch(error=>console.error(error))


}

function showDailyExpenses(data){
    var toappendTable = `<h4 class="text-center">Daily Report</h4><br><table class="table" id="superTable"><thead><tr><th>Expenses</th><th>Description</th><th>category</th></tr></thead><tbody>`;
        let totalExpense = 0;
        for(let i = 0; i<data.length; i++){
        toappendTable += `<tr>`;
        const newkeys = [...Object.keys(data[0])]; 
        
            for(const newkey of newkeys){

               
                     toappendTable += `<td>${data[i][newkey]}</td>`;
                     if(newkey == 'expense'){
                        totalExpense += +data[i][newkey];
                     }
               
                
                  
            }
            toappendTable += `</tr>`;
          }    

     toappendTable += `</tbody></table><h6 class="float-right">Total Expenses: Rs${totalExpense}</h6>`;   
     
     document.getElementById("dailyExpenseReportTableBody").innerHTML = "";
     document.getElementById("dailyExpenseReportTableBody").appendChild(document.createRange().createContextualFragment(toappendTable))
       

}


function showWeeklyExpenses(data){
    var toappendTable = `<h4 class="text-center">Weekly Report</h4><br><table class="table" id="superTable"><thead><tr><th>Expenses</th><th>Description</th><th>category</th></tr></thead><tbody>`;
        let totalExpense = 0;
        for(let i = 0; i<data.length; i++){
        toappendTable += `<tr>`;
        const newkeys = [...Object.keys(data[0])]; 
        
            for(const newkey of newkeys){

               
                     toappendTable += `<td>${data[i][newkey]}</td>`;
                     if(newkey == 'expense'){
                        totalExpense += +data[i][newkey];
                     }
               
                
                  
            }
            toappendTable += `</tr>`;
          }    

     toappendTable += `</tbody></table><h6 class="float-right">Total Expenses: Rs${totalExpense}</h6>`;   
     
     document.getElementById("weeklyExpenseReportTableBody").innerHTML = "";
     document.getElementById("weeklyExpenseReportTableBody").appendChild(document.createRange().createContextualFragment(toappendTable))
       

}


function showMonthlyExpenses(data){
    var toappendTable = `<h4 class="text-center">Monthly Report</h4><br><table class="table" id="superTable"><thead><tr><th>Expenses</th><th>Description</th><th>category</th></tr></thead><tbody>`;
        let totalExpense = 0;
        for(let i = 0; i<data.length; i++){
        toappendTable += `<tr>`;
        const newkeys = [...Object.keys(data[0])]; 
        
            for(const newkey of newkeys){

               
                     toappendTable += `<td>${data[i][newkey]}</td>`;
                     if(newkey == 'expense'){
                        totalExpense += +data[i][newkey];
                     }
               
                
                  
            }
            toappendTable += `</tr>`;
          }    

     toappendTable += `</tbody></table><h6 class="float-right">Total Expenses: Rs${totalExpense}</h6>`;   
     
     document.getElementById("monthlyExpenseReportTableBody").innerHTML = "";
     document.getElementById("monthlyExpenseReportTableBody").appendChild(document.createRange().createContextualFragment(toappendTable))
       

}



