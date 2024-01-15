var signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener('submit',signUp);


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

function isValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function signUp(e){
    e.preventDefault();
    console.log('hi');
    if(validateInput()){
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const data = {};

        data.username = username;
        data.email = email;
        data.password = password;

        console.log(data);

         axios.post("http://localhost:5000/user/signup",{data
         })
         .then(res =>{
            alert(res.data.success);
            window.location.href = "login.html";
         })
         .catch(error=>{
            if(error){
                let errorMessage = "";

                
                (error.response.data.error.errors).forEach(err => {
                     errorMessage += err.message+'\n';
                    
                 });
    
             alert(errorMessage);
            }
         });

    }else{
        console.log(false)
    }
}

function validateInput(){
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let flag = 1;

    if(username.value.trim() === ''){
        setError(username, 'Username is required');
        flag = 0;
    }else{
        setSuccess(username);
    }

    if(email.value.trim() === '') {
        setError(email, 'Email is required');
        flag = 0;
    } else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(password.value.trim() === '') {
        setError(password, 'Password is required');
        flag = 0;
    } else if ((password.value.trim()).length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
        flag = 0;
    } else {
        setSuccess(password);
    }

    if(flag == 1){
        return true;
    }else{
        return false;
    }
}

