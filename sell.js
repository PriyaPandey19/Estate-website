document.addEventListener('DOMContentLoaded', function(){
    const mapElement = document.getElementById('homeValueMap');
    if(!mapElement) return;

const map = L.map('homeValueMap').setView([37.7749, -122.4194], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',  // Credit for map data
        maxZoom: 19  // Maximum zoom level allowed
    }).addTo(map);  

// Array of property objects with location and price data
    const properties = [
        { 
            lat: 37.7749,           // Latitude coordinate
            lng: -122.4194,         // Longitude coordinate
            price: '$1,250,000',    // Property price
            address: '123 Main St'  // Property address
        },
        { lat: 37.7849, lng: -122.4094, price: '$1,450,000', address: '456 Oak Ave' },
        { lat: 37.7649, lng: -122.4294, price: '$980,000', address: '789 Pine St' },
        { lat: 37.7949, lng: -122.3994, price: '$1,650,000', address: '321 Elm Dr' }
    ];

    // Loop through each property and add a marker
    properties.forEach(prop => {
        L.marker([prop.lat, prop.lng])  // Create marker at property coordinates
            .addTo(map)                  // Add marker to the map
            .bindPopup(`                 // Attach popup that shows on click
                <div style="text-align: center; padding: 8px;">
                    <strong style="font-size: 16px; color: #0D3166;">${prop.price}</strong><br>
                    <span style="font-size: 12px; color: #666;">${prop.address}</span>
                </div>
            `);
    });

    // Add functionality to the "Start tracking" button
    const startBtn = document.querySelector('.start-tracking-btn');
    if (startBtn) {  // Check if button exists
        startBtn.addEventListener('click', function() {
            alert('Starting home value tracking! You will receive regular updates.');
        });
    }
});    



//scroll functionality
const scrollContainer = document.getElementById('propertiesScroll');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

scrollLeft.addEventListener('click',() =>{
    scrollContainer.scrollBy({left: -350, behavior:'smooth'})
});
scrollRight.addEventListener('click',() =>{
    scrollContainer.scrollBy({left: 350, behavior:'smooth'})
});

const dummyHomes =[
    {
        price:"$450,000",
        specs:"3 bed • 2 bath • 1,800 sqft",
        address:"789 Willow St",
        city:"Colorado Springs, CO 80918"
       
    },
    {
        price:"$720,000",
        specs:"4 bed • 3 bath • 2,900 sqft",
        address:"124 Pine Ave",
        city:"Denver, CO 80203"
       
    },
    {
        price:"$599,000",
        specs:"3 bed • 2 bath • 2,200 sqft",
        address:"342 Lakeview Dr",
        city:"Boulder, CO 80302"
       
    }
];



const similarHomeBtn = document.getElementById('similarHomesBtn');
similarHomeBtn.addEventListener('click',(e) =>{
    e.preventDefault();           //this is use so that default action of the btn cannot be perform


//create modal
const modal = document.createElement('div');
modal.style.cssText =
           ` position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 420px;
            width: 90%;
            text-align: center;
            `;
modal.innerHTML =`<h3 style="font-size: 22px; margin-bottom: 16px;">Find Similar Homes</h3>
            <p style="font-size: 15px; margin-bottom: 20px; color: #555;">Enter your address to find homes similar to yours.</p>
            <input id="addressInput" type="text" placeholder="Enter your address" 
                style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 15px;">
            <button id="searchBtn" style="width: 100%; background: #333; color: white; border: none; padding: 12px; border-radius: 8px; margin-bottom: 10px;">Search</button>
            <button id="closeBtn" style="width: 100%; background: transparent; color: #666; border: 2px solid #e0e0e0; padding: 10px; border-radius: 8px;">Cancel</button>
            <div id="results" style="margin-top: 20px; text-align: left;"></div>  `
            ;
            
const backdrop = document.createElement('div');
backdrop.style.cssText =`position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;`            
 document.body.appendChild(backdrop);
 document.body.appendChild(modal);
 
 const resultsDiv= modal.querySelector('#results');





 //close btn
 const closeModal =() =>{
    modal.remove();backdrop.remove();   //this is used to remove both the popup card & dark screen
 }
 modal.querySelector('#closeBtn').addEventListener('click',closeModal);   //it will close the cancel btn when clicked
 backdrop.addEventListener('click', closeModal);        //it will close dark screen btn when clicked


 //search function(dummy)
 modal.querySelector("#searchBtn").addEventListener('click',() =>{
    const address = modal.querySelector('#addressInput').value.trim().toLowerCase();
    resultsDiv.innerHTML ="";

    if(!address){
        resultsDiv.innerHTML =`<p style="color:red;">⚠ Please enter an address</p>`
        return;
    }


//   filter dummy homes by city/addresskeyword  
    const matches = dummyHomes.filter(h => 
        h.city.toLowerCase().includes(address) || h.address.toLowerCase().includes(address)
    );


    if(matches.length >0){
        matches.forEach( h =>{
            resultsDiv.innerHTML +=
            `<div style ="border:1px solid #ddd; border-radius:8px; padding:12px;margin-bottom:10px">
            <strong>${h.price}</strong><br>
            <span>${h.specs}<span><br>
            <span style ="color:#444;">${h.address},${h.city}</span>
            <div>`;
        })
    }else{
        resultsDiv.innerHTML =`<p style="color:#333;"> No similar results found for"<strong>${address}</strong>".</p>`
    }
 });    
});


//faqs
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click',() =>{
        const answer = question.nextElementSibling;
        question.classList.toggle('active');
        answer.classList.toggle('active');
    })
})