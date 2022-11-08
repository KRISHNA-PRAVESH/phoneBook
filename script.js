//creating a map that stores name and their mobile number
const contact = new Map();
contact.set('krishna',9344930703);

function add(){
    let name = prompt('Enter name');
    let number = prompt('Enter mobile number');
    contact.set(name,number);
}

function search(){
    let name = document.getElementById('name').value;

    let num = contact.get(name);
    if(num==undefined) alert('Not found');
    else alert(`Name: ${name}, Number: ${contact.get(name)}`);
    
    
}