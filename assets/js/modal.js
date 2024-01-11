function openModal() {
    $('#modal-saved-movies').addClass('is-active');
}

// Function to close the modal
function closeModal() {
    $('#modal-saved-movies').removeClass('is-active');
}

// When button is clicked modal closes
$('#modal-saved-movies').click(function () {
    closeModal();
});

// Add event listener to the form select
$('#saved-movies').change(function () {
    // Check the selected option value
    var selectedOption = $(this).val();

    // If a specific option is selected, open the modal
    // not sure how to select anything and its generated?
    if (selectedOption === selectedOption) {
        openModal();
    } else {
        closeModal();
    }
});