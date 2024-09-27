const addUserBtn = document.getElementById('addUser');
const btntext = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

 let objstr = localStorage.getItem('users');

 if(objstr!=null){
 userArray = JSON.parse(objstr);
 }

 DisplayInfo();
addUserBtn.onclick=()=>{
  const name =usernameTextField.value;
  if(edit_id!=null){
    //edit
    userArray.splice(edit_id,1,{'name' : name})
    edit_id = null;
  }else{
    //insert

    userArray.push({'name' : name});
  }
    console.log(userArray);
    SaveInfo(userArray);
    usernameTextField.value ='';
    DisplayInfo();
    addUserBtn.innerText =btntext;

}

function SaveInfo(userArray){
  let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
}

function DisplayInfo(){
  let statment ='';
  userArray.forEach((user,i)=> {
    statment +=`       <tr>
                <th scope="row">${i+1}</th>
                <td>${user.name}</td>
                <td><i class=" btn text-white fa-solid fa-pen-to-square btn-info mx-2" onclick='EditInfo(${i})' ></i><i
                    class=" btn btn-danger text-white fa-solid fa-trash-can" onclick='DeleteInfo(${i})' ></i></td>
              </tr>`;
  });
  recordsDisplay.innerHTML = statment;
}

function EditInfo(id){
  edit_id = id; 
  usernameTextField.value = userArray[id].name;
  addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id){
  userArray.splice(id,1);
  SaveInfo(userArray);
  DisplayInfo();
}