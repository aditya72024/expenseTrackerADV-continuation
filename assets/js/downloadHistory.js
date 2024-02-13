var DownloadHistoryModal = new bootstrap.Modal(document.getElementById('downloadHistoryModal')); 

function closeDownloadHistoryModal(){
    DownloadHistoryModal.hide();
}    



function getDownloadHistory(){
    DownloadHistory();
    DownloadHistoryModal.show();    
    }


function DownloadHistory(){

        axios.get("http://localhost:5000/getDownloadHistory", {headers: {"Authorization":token}})
          .then(res =>{
                console.log(res.data);
                showDownloadHistory(res.data)
                 
          })
          .catch(error=>console.error(error))
        
        
}

function showDownloadHistory(data){
    var toappendTable = `<h4 class="text-center">Download History</h4><br><table class="table" id="superTable"><thead><tr><th>File URL</th><th>Created At</th></tr></thead><tbody>`;
        let totalExpense = 0;
        for(let i = 0; i<data.length; i++){
        toappendTable += `<tr>`;
        const newkeys = [...Object.keys(data[0])]; 
        
            for(const newkey of newkeys){
                

               if(newkey == "fileurl"){
                toappendTable += `<td><a href="${data[i][newkey]}" download="${data[i][newkey]}.csv">${data[i][newkey].substring(0, 14) + "..."}</a></td>`;

               }else{
                toappendTable += `<td>${data[i][newkey]}</td>`;

               }
                    //  if(newkey == 'expense'){
                    //     totalExpense += +data[i][newkey];
                    //  }
               
                
                  
            }
            toappendTable += `</tr>`;
          }    

     toappendTable += `</tbody></table>`;   
     
     document.getElementById("downloadHistoryTableBody").innerHTML = "";
     document.getElementById("downloadHistoryTableBody").appendChild(document.createRange().createContextualFragment(toappendTable))
       

}