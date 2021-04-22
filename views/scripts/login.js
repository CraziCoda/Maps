const switch1 = document.getElementById("switch1");
const switch2 = document.getElementById("switch2");
const form1 = document.getElementById('login');
const form2 = document.getElementById('signup');

switch1.addEventListener("click", ()=>{
    switch1.disabled = true;
    switch2.disabled = false;
    form1.style.display = "block";
    form2.style.display = 'none';
})

switch2.addEventListener("click", ()=>{
    switch2.disabled = true;
    switch1.disabled= false;
    form2.style.display = "block";
    form1.style.display = 'none';
})