// async function getAllBikes() {
//   try {
//     const url = "fsjf;lskf";
//     const token = localStorage.getItem("token");
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }

// async function renderBikes() {
//   console.log("called");
//   try {
//     const url = "http://localhost:3000/bikes";
//     const token =
//       localStorage.getItem("token") ||
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVhZTc1NzQzNzBkYzEwZmQ1NzU1ZTIiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE3MTcyNDI5NjQsImV4cCI6MTcxNzI0NjU2NH0.FQYySkImMV_HHzBbsZEAAwp8yvs6PLoQ-OtfPCji-6s";
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     const data = await response.json();
//     const bikeGrid = document.getElementById("bike-grid");
//     bikeGrid.innerHTML = "";

//     for (let i = 0; i < data.length; i++) {
//       bikeGrid.innerHTML += `<a id="${data[i]._id}" href="" class="bike-item">
//           <article id="${data[i]._id}" onclick="showBike(event)">
//             <figure id="${data[i]._id}" >
//               <img id="${data[i]._id}" src= "${data[i].image}" alt="" />
//             </figure>
//             <h2 id="${data[i]._id}" >${data[i].name}</h2>
  
//           </article>
//         </a>`;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function showBike(e) {
//   try {
//     e.preventDefault();

//     console.log(e, "clicked");
//     const bikeId = e.target.id;
//     const url = "http://localhost:3000/bikes/" + bikeId;
//     const token =
//       // localStorage.getItem("token") ||
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVhZTc1NzQzNzBkYzEwZmQ1NzU1ZTIiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE3MTcyNDI5NjQsImV4cCI6MTcxNzI0NjU2NH0.FQYySkImMV_HHzBbsZEAAwp8yvs6PLoQ-OtfPCji-6s";
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     });
//     const data = await response.json();

//     const bikeContainer = document.getElementById("bike-data");
//     bikeContainer.innerHTML = "";
//     const data_element = ` <article ${data._id}>
//       <div class="data-bike-image">
//         <figure>
//           <img src=${data.image} alt=${data.name} />
//         </figure>
//       </div class="data-bike-info">
       
//            <p class="p-item"><span class="p-span-item">Name:</span> ${data.name}  </p>
//            <p class="p-item"><span class="p-span-item">Price:</span> $${data.price}</p>
//            <p class="p-item"><span class="p-span-item">Description:</span>  ${data.description}</p>
//            <p class="p-item"><span class="p-span-item">Bike Type:</span> ${data.bikeType}</p>
//            <p class="p-item"><span class="p-span-item">Age Range:</span> ${data.ageRange} </p>
//            <p class="p-item"><span class="p-span-item">Brand:</span> ${data.brand}</p>
//            <p class="p-item"><span class="p-span-item">Number of Speeds:</span> ${data.numberOfSpeeds}</p>
//            <p class="p-item"><span class="p-span-item">Color:</span> ${data.color}</p>
//            <p class="p-item"><span class="p-span-item">Wheel Size:</span> ${data.wheelSize}</p>
//            <p class="p-item"><span class="p-span-item">Model Number:</span> ${data.modelNumber}</p>
  
        
//     </article>`;
//     bikeContainer.innerHTML = data_element;
//   } catch (err) {
//     console.log(err);
//   }
// }

// window.addEventListener("load", renderBikes);
