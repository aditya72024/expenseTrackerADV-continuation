var form = document.getElementById("addForm");
var ul = document.getElementById("items");
var expenseDiv = document.getElementById("expenseDiv");
var totalSpan = document.getElementById("totalSpan");
form.addEventListener('submit', addItem);
ul.addEventListener('click', removeItem);

var token = localStorage.getItem('token');
var ispremiumuser = localStorage.getItem('ispremiumuser');
// var deleteItems = document.getElementsByClassName("delete");
function triggerRowPerPage(){
    loadExpenses(localStorage.getItem("noofpage"),document.getElementById("noofrows").value);
    localStorage.setItem("noofrows",document.getElementById("noofrows").value);

}




window.addEventListener("DOMContentLoaded",()=>{



        
    if(ispremiumuser !== "null"){
        activatePremium();
    }

        var noofrows = localStorage.getItem("noofrows");
        var noofpage = localStorage.getItem("noofpage");

        if(!noofrows){
            localStorage.setItem("noofrows",1);
        }
        if(!noofpage){
            localStorage.setItem("noofpage",1);
        }

        loadExpenses(noofpage,noofrows);

})

function activatePremium(){
    var premiumDropdown = "<li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='javascript:void(0);' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>Menus</a><ul class='dropdown-menu' aria-labelledby='navbarDropdown'><li><a class='dropdown-item' href='javascript:void(0);' id='showLearderBoard'>LeaderBorad</a></li><li><a class='dropdown-item' href='javascript:void(0);' id='showExpenseReport'>Expense Report</a></li><li><a class='dropdown-item' href='javascript:void(0);' id='showDownloadHistory'>Download History</a></li></ul></li>";
    document.getElementById("navbar-nav").appendChild(document.createRange().createContextualFragment(premiumDropdown))
    document.getElementById("nav-item").innerHTML = "";
    document.getElementById("nav-item").innerHTML = "<a class='premiumUser' href='javascript:void(0)';>You are a premium user!!!</a>";






            document.getElementById("showLearderBoard").addEventListener('click',getLearderBoard);
            document.getElementById("closeLeaderBoardModal").addEventListener('click',closeLeaderBoardModal);

            document.getElementById("showExpenseReport").addEventListener('click',getExpenseReport);
            document.getElementById("closeExpenseReportModal").addEventListener('click',closeExpenseReportModal);

            document.getElementById("showDownloadHistory").addEventListener('click',getDownloadHistory);
            document.getElementById("closeDownloadHistoryModal").addEventListener('click',closeDownloadHistoryModal);
            
            document.getElementById("expenseDownload").addEventListener('click',expenseDownload);
}    

const loadExpenses = async (noofpage,noofrows) => {

    try{

    
    const response = await axios.get(`http://localhost:5000?page=${noofpage}&noofrows=${noofrows}`, {headers: {"Authorization":token}})
      
    
        document.getElementById("pagination").innerHTML ="";
        document.getElementById("rowperpage").innerHTML ="";
        document.getElementById("items").innerHTML ="";
    
        const {data,totalExpenses,totalItems, pageData} = response.data;
    
        if(data.length > 0){
    
    
            expenseDiv.style.display = "block";
            let total = 0;
    
            for(var i = 0; i<data.length;i++){
                showOutput(data[i], totalExpenses,pageData);   
            }
    
            showRowSelector(totalItems);
            showPagination(pageData);
    
        }else{
            expenseDiv.style.display = "none";
        }

    }catch(error){
        if(error){
            alert("Something went wrong !!!");
        }
    }
      
    }




    function showPagination({
        currentPage,
        hasNextPage,
        nextPage,
        hasPreviousPage,
        previousPage,
        lastPage,
    }){
    
        document.getElementById("pagination").innerHTML = "";
    
        if(hasPreviousPage){
            const btn2 = document.createElement("button")
            btn2.innerHTML = previousPage,
            btn2.addEventListener('click',()=>{
                loadExpenses(previousPage,localStorage.getItem("noofrows"))
            })
            document.getElementById("pagination").appendChild(btn2)
        }
    
        const btn1 = document.createElement("button")
        btn1.innerHTML = `<h3 id="currentPage">${currentPage}</h3>`
        btn1.addEventListener('click',()=>{
                loadExpenses(currentPage,localStorage.getItem("noofrows"))
            })
            document.getElementById("pagination").appendChild(btn1)
    
        if(hasNextPage){
            const btn3 = document.createElement("button");
            btn3.innerHTML = nextPage;
            btn3.addEventListener('click',()=>{
                loadExpenses(nextPage,localStorage.getItem("noofrows"))
            })
            document.getElementById("pagination").appendChild(btn3)
    
        }    
    
    }

    function showOutput(data, total,pageData){



        if(data){
  
              expenseDiv.style.display = "block";
              totalSpan.textContent = total;
        }  
  
       var expense = data.expense;
        var description = data.description;
        var category = data.category;
        var id = data.id;
  
  
        var value = expense + '-' + description + '-' + category;
  
        li = document.createElement("li");
        li.className = 'list-group-item';
        li.setAttribute('data-id',id);
        li.appendChild(document.createTextNode(value));
  
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-primary btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteBtn);
  
        // var editBtn = document.createElement('button');
        // editBtn.className = 'btn btn-primary btn-sm float-right edit';
        // editBtn.appendChild(document.createTextNode('Edit'));
        // li.appendChild(editBtn);
  
        ul.appendChild(li);
  
        
       
  
  }
  
  
  function showRowSelector(totalItems){
  
      let selectBody = `<select name="noofrows" id="noofrows" onchange="triggerRowPerPage()">`
  
      for(let i=1; i<=totalItems;i++){
  
          selectBody += `<option value="${i}" ${localStorage.getItem("noofrows") == i ? 'selected=selected' : ''} >${i}</option>`;
  
      }    
              
              
      selectBody += `</select>`;
      document.getElementById("rowperpage").appendChild(document.createRange().createContextualFragment(selectBody))
  
  }
  
  
  
  function addItem(e){
      e.preventDefault();
      var expense = document.getElementById("expense").value;
      var description = document.getElementById("description").value;
      var category = document.getElementById("category").value;
      var eid = document.getElementById("expenseId").value;
  
  
      var entryObject = {};
      entryObject.expense = expense;
      entryObject.description = description;
      entryObject.category = category;
  
      if(eid){
  
          putInTable(entryObject,eid);
  
      }else{
          storeInTable(entryObject)
      }
      
      document.getElementById("expense").value = '';
      document.getElementById("description").value = '';
      document.getElementById("category").value = '';
      document.getElementById("expenseId").value = '';
  
  }

  function storeInTable(data){
    console.log(token)

      axios.post("http://localhost:5000/addExpense",{data
      },{headers: {"Authorization":token}})
      .then(res =>{

               
             loadExpenses(localStorage.getItem("noofpage"),localStorage.getItem("noofrows"));
             
      })
      .catch(error=>console.error(error))

}






function removeItem(e){



    var liRemove = e.target.parentElement;
    var liRemoveid = liRemove.getAttribute('data-id');
    

    if(e.target.classList.contains('delete')){

       if(confirm("Are you sure?")){
            axios.delete("http://localhost:5000/deleteExpense/"+liRemoveid, {headers: {"Authorization":token}})
            .then(res=>{
             ul.removeChild(liRemove);
             loadExpenses(noofpage,noofrows);
         }).catch(error=>console.error(error))
        }}


        if(e.target.classList.contains('edit')){

            var liEdit = e.target.parentElement;
            var liEditId = liEdit.getAttribute('data-id');

            axios.get("http://localhost:5000/getParticularExpense/"+liRemoveid)
            .then(res=> {

            var expense = res.data.expense;
            var description = res.data.description;
            var category = res.data.category;
            var eid = res.data.id;
            document.getElementById("expense").value = expense;
            document.getElementById("description").value = description;
            document.getElementById("category").value = category;
            document.getElementById("expenseId").value = eid;

            let total = parseFloat(totalSpan.textContent) - parseFloat(res.data.expense);
            totalSpan.textContent = total;

            ul.removeChild(liEdit);
        });

        }
}

document.getElementById("payButton").onclick = async function(e){
    const response = await axios.get('http://localhost:5000/purchase/premium',{headers: {"Authorization":token}})
    console.log(response.data)
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function(response){
            await axios.post('http://localhost:5000/purchase/updateTransactionStatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, {headers: {"Authorization": token}})
            e.target.parentElement.innerHTML = "<a class='navbar-brand' id='showLearderBoard' href='javascript:void(0);'>You are a premium user!!! Show LeaderBoard</a>";
            localStorage.setItem('ispremiumuser',1);
            activatePremium();
            alert("You are a Premium User Now");
        }

    };

    const rpz1 = new Razorpay(options);
    rpz1.open();
    e.preventDefault();

    rpz1.on('payment.failed', function (response){
        console.log(response);
        alert("Something went wrong");

    });
}
  