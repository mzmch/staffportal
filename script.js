const scriptURL = 'https://script.google.com/macros/s/AKfycbw2iQJNxZuqxU3lSOUKFkWiiftkH7GgF3lWdfLRjf4BNkSe_WTuDNcF7Pq_RE3nQdF53A/exec';
const form = document.getElementById('purchase-form');
const status = document.getElementById('status');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    status.innerText = ''; // Clear previous status
    progressBarContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressBar.innerText = '0%';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Simulate progress (optional, as actual progress might not be easily available)
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + '%';
            progressBar.innerText = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                return response.json();
            }
        }, 100);
        return response.json(); // Return the promise here as well
    })
    .then(data => {
        progressBarContainer.style.display = 'none';
        if (data.result === "success") {
            status.innerText = "Request submitted successfully!";
            form.reset();
        } else {
            status.innerText = "Something went wrong.";
        }
    })
    .catch(error => {
        progressBarContainer.style.display = 'none';
        status.innerText = "Error: " + error.message;
    });
});
