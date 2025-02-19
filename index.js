const deletePassword = (email)=>{
    let data = localStorage.getItem('passwords');
    let arr = JSON.parse(data);
        let arrUpdated = arr.filter((e)=>{
            return e.email != email
        })
        localStorage.setItem('passwords', JSON.stringify(arrUpdated));
        alert(`Succesfully Deleted ${email}`)
        showPassword()
    }



document.querySelector('.add-button').addEventListener('click', (e)=>{
    e.preventDefault();
    let passwords = localStorage.getItem("passwords")
    if(passwords === null){
        let json = [];
        json.push({
            email: email.value, password: password.value
        })
        alert('Password Saved');
        localStorage.setItem('passwords', JSON.stringify(json));
    }
    else{
        let json = JSON.parse(localStorage.getItem('passwords'))
        json.push({email: email.value, password: password.value})
        alert('Passowrd Saved');
        localStorage.setItem('passwords', JSON.stringify(json))
    }
    showPassword();
})

const showPassword = ()=>{
    let tb = document.querySelector('.table');
    let data = localStorage.getItem('passwords');

    if(data === null || JSON.parse(data).length === 0){
        tb.innerHTML = '<div class="nodata">no data to show</div>';
    }
    else {
        tb.innerHTML = `
        <tr>
            <th>user name</th>
            <th>Password</th>
            <th>delete</th>
        </tr>
        `

        let arr = JSON.parse(data);
        let str = '';
        for(let i=0; i<arr.length; i++){
           const element =  arr[i];

           str += `
        <tr>
            <td>${element.email}<img src="svg/icons8-copy-24.png" class="copy-button"
            onclick = "copyTxt('${element.email}')"
            ></td>
            <td>${maskPass(element.password)}<img src="svg/icons8-copy-24.png" class="copy-button"
            onclick = "copyTxt('${element.password}')"
            ></td>
            <td><button class="delete-button"
            onclick = "deletePassword('${element.email}')"
            >Delete</button></td>
        </tr>
           `
        }
        tb.innerHTML += str;
    }

    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
    
}

showPassword();

function copyTxt(txt) {
    navigator.clipboard.writeText(txt).then(
        ()=>{
            alert('password copied');
        }
    )
}

function maskPass(pass){
let str = '';
for(let i=0; i<pass.length; i++){
    str += '*';
}
return str;
}