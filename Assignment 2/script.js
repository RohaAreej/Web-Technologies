function validate(){
    let emailInput= document.getElementById('email');
    let passwordInput= document.getElementById('password');

    if(emailInput.value.trim()===''){

        emailInput.classList.add('invalid');
        document.getElementById('email').classList.add("shake");
        return false;
    }
    if(passwordInput.value.trim()===''){

        passwordInput.classList.add('invalid');
        document.getElementById('password').classList.add("shake");
        return false;
    }
    return true;
}