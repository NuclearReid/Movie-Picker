<<<<<<< HEAD
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
=======
// function openModal() {
//     document.getElementById('modal-saved-movies').classList.add('is-active');
// }

// // Function to close the modal
// function closeModal() {
//     document.getElementById('modal-saved-movies').classList.remove('is-active');
// }

// // When button is clicked modal closes
// document.getElementById('modal-saved-movies').addEventListener('click', function () {
//     closeModal();
// });

// // Add event listener to the form select
// document.getElementById('saved-movies').addEventListener('change', function () {
//     // Check the selected option value
//     var selectedOption = this.value;
>>>>>>> b0cf722aa048c06c3ad110aa57c231a296b9baf0

//     // If a specific option is selected, open the modal
//     // not sure how to select anything and its generated?
//     if (selectedOption === selectedOption) {
//         openModal();
//     } else {
//         closeModal();
//     }
// });