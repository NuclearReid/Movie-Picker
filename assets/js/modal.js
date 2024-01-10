function openModal() {
    document.getElementById('modal-saved-movies').classList.add('is-active');
}

// Function to close the modal
function closeModal() {
    document.getElementById('modal-saved-movies').classList.remove('is-active');
}

// When button is clicked modal closes
document.getElementById('modal-saved-movies').addEventListener('click', function () {
    closeModal();
});

// Add event listener to the form select
document.getElementById('saved-movies').addEventListener('change', function () {
    // Check the selected option value
    var selectedOption = this.value;

    // If a specific option is selected, open the modal
    // not sure how to select anything and its generated?
    if (selectedOption === selectedOption) {
        openModal();
    } else {
        closeModal();
    }
});

