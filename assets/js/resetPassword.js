var loginForm = document.getElementById("resetPasswordForm");
loginForm.addEventListener('submit',submit);


function setSuccess(e){
    const inputControl = e.parentElement;
    const errorDisplay = inputControl.querySelector('.fielderror');
    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function setError(e, message){
    const inputControl = e.parentElement;
    const errorDisplay = inputControl.querySelector('.fielderror');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

// function isValidEmail(email){
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }


function submit(e){
    e.preventDefault();
    console.log('hi');
    if(validateInput()){
        
        // const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const data = {};

        
        // data.email = email;
        data.password = password;
        const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1)
        console.log(lastItem)

        console.log(data);



    }else{
        console.log(false)
    }
}

function validateInput(){
    
    // const email = document.getElementById("email");
    const password = document.getElementById("password");
    let flag = 1;



    if(email.value.trim() === '') {
    //     setError(email, 'Email is required');
    //     flag = 0;
    // } else if (!isValidEmail(email.value.trim())) {
    //     setError(email, 'Provide a valid email address');
    // } else {
    //     setSuccess(email);
    // }

    if(password.value.trim() === '') {
         setError(password, 'Password is required');
         flag = 0;
     }else {
         setSuccess(password);
     }

    if(flag == 1){
        return true;
    }else{
        return false;
    }
}

