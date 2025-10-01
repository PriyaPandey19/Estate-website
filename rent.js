document.addEventListener("DOMContentLoaded", ()=>{
 const counters = document.querySelectorAll(".revenue-number");   //in this the div is selected

 counters.forEach(counter =>{                     //this is for each loop for each count
 const target = +counter.getAttribute("data-target");   //through this we are getting the target value
 let count =0;
 const speed = 70;

 const updateCount =() =>{             //this is for updation 
    const increment = Math.ceil(target/400);
    count += increment;

    if(count < target){                    //if count is less than target than show
        counter.innerText = count.toLocaleString()+ "+";
        setTimeout(updateCount, speed);        //function calling
    }
    else{
      counter.innerText = target.toLocaleString()+ "+";       //else set to last targeted value
    }
 }
 updateCount();
 });
});



