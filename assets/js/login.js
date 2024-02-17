var loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit',login);


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


function login(e){
    e.preventDefault();
    console.log('hi');
    if(validateInput()){
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const data = {};

        
        data.email = email;
        data.password = password;

        getLoginData(data);

    }else{
        console.log(false)
    }
}

const getLoginData = async (data) => {

    try{
        
        const res = await axios.post("http://51.20.41.247:5000/user/login",{data});
        alert(res.data.message);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('ispremiumuser',res.data.ispremiumuser);
        window.location.href = "index.html";
    }catch(error){
        if(error){
            console.log(error.response.data)
            alert(error.response.data.message);
        }
    }
}

function validateInput(){
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let flag = 1;



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
    }else {
        setSuccess(password);
    }

    if(flag == 1){
        return true;
    }else{
        return false;
    }
}

