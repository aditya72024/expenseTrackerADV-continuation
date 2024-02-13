var LeaderBoardModal = new bootstrap.Modal(document.getElementById('leaderBoardModal')); 

function closeLeaderBoardModal(){
    LeaderBoardModal.hide();
}   

const getLearderBoard = async () => {

    try{
        const res = await axios.get("http://localhost:5000/getLeaderBoard", {headers: {"Authorization":token}})
        showLeaderBoard(res.data);
    }catch(error){
        if(error){
            alert("Something went wrong !!!");
        }
    }

}

function showLeaderBoard(data){

    var toappendTable = `<table class="table" id="superTable"><thead><tr><th>Username</th><th>Total Expense</th></tr></thead><tbody>`;
    for(let i = 0; i<data.length; i++){
        toappendTable += `<tr>`;
        const newkeys = [...Object.keys(data[0])]; 
            for(const newkey of newkeys){

                console.log(newkey)
                
                     toappendTable += `<td>${data[i][newkey]}</td>`;

                
                  
            }
            toappendTable += `</tr>`;
          }    

     toappendTable += `</tbody></table>`;   
     
     document.getElementById("leaderBoardTableBody").innerHTML = "";
     document.getElementById("leaderBoardTableBody").appendChild(document.createRange().createContextualFragment(toappendTable))
     LeaderBoardModal.show();      
}

function showhide() { 
    
    LeaderBoardModal.show(); 
     
} 