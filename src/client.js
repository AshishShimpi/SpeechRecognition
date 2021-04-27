const socket =  io('https://speere.herokuapp.com/'); 
document.addEventListener("DOMContentLoaded", () => {

  const name = prompt('enter your name');
  let bar = document.getElementsByClassName('transfer');
  let spacebar = document.getElementsByClassName('pretransfer');
  let user = document.getElementById('user');

  //1
  socket.emit('new', name);
  //2
  socket.on('lets-start' , na =>{
    console.log('newly connected user is ',na);
  })
  //3
  socket.on(`client-receive` , tata =>{
    bar[0].innerHTML =tata.F ;
    // spacebar[0].innerHTML = tata.I;
    user.innerHTML = tata.user;  
  })

  



   
})
