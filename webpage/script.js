function fetchAndDisplayPdfs(csvUrl, loc) {
    fetch(csvUrl)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          complete: function(results) {
            const eventsData = results.data.filter(row => row.length > 0 && row[1] !== ''); 
  
            for (let i = 1; i < eventsData.length; i++) { // Start loop from index 1
              const row = eventsData[i];
              const eventName = row[1]; 
  
              if (eventName.trim() !== '') { 
                const sheetLink = row[2];
                const eventItem = document.createElement('li');
                eventItem.classList.add('school');
                eventItem.id = `event-${i}`;
  
                const eventAnchor = document.createElement('a');
                const fileUrl = loc + sheetLink; // Path to the PDF file
                
                // Redirect to the PDF viewer page
                eventAnchor.href = `pdf-viewer.html?file=${encodeURIComponent(fileUrl)}`; // Passing the PDF URL as query parameter
  
                eventAnchor.textContent = eventName;
  
                eventItem.appendChild(eventAnchor);
                document.getElementById('file_list').appendChild(eventItem);
              }
            }
          }
        });
      })
      .catch(error => console.error('Error fetching CSV data:', error));
  }
  

  function fetchAndDisplayLinks(csvUrl) {
    fetch(csvUrl)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          complete: function(results) {
            const eventsData = results.data.filter(row => row.length > 0 && row[1] !== ''); 
  
            for (let i = 1; i < eventsData.length; i++) { // Start loop from index 1
              const row = eventsData[i];
              const eventName = row[1]; 
  
              if (eventName.trim() !== '') { 
                const sheetLink = row[2];
                const eventItem = document.createElement('li');
                eventItem.classList.add('school');
                eventItem.id = `event-${i}`;
  
                const eventAnchor = document.createElement('a');
                eventAnchor.href = sheetLink;
                // eventAnchor.target = '_blank';
                eventAnchor.textContent = eventName;
  
                eventItem.appendChild(eventAnchor);
                document.getElementById('file_list').appendChild(eventItem);
              }
            }
          }
        });
      })
      .catch(error => console.error('Error fetching CSV data:', error));
  }

  const searchInput = document.getElementById("school_search");
searchInput.addEventListener("input", filterSchools);

// Filter schools based on the search input
function filterSchools(event) {
  const filterValue = event.target.value.toLowerCase();
  const schoolList = document.getElementById("file_list");
  const schools = schoolList.querySelectorAll("li"); // Querying all list items (li)

  // Filter logic: show/hide schools based on search input
  for (const school of schools) {
    const schoolText = school.textContent.toLowerCase();
    // Toggle the display based on whether the school name includes the search term
    school.style.display = schoolText.includes(filterValue) ? "" : "none";
  }
}


// LOADER

const loader = document.getElementById('loader-container');
const loaderHome = document.getElementById('loader-container-home');

if (loader) {
  showLoader();

  setTimeout(() => {
    loader.classList.add('fade-out'); 
  }, 2100); 

  setTimeout(() => {
    hideLoader(); 
  }, 2500); 
}

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoaderHome() {
  loaderHome.style.display = 'flex';
}

function hideLoaderHome() {
  loaderHome.style.display = 'none';
}

if (loaderHome) {
  showLoaderHome();

  setTimeout(() => {
    loaderHome.classList.add('fade-out'); 
  }, 1200); 

  setTimeout(() => {
    hideLoaderHome(); 
  }, 1600); 
}
