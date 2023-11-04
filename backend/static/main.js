const form = document.getElementById('form');

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault()
    const files = document.getElementById("files");
    
    window.formData = new FormData();
    formData.append("files", files.files[0]);
    
    fetch("http://127.0.0.1:7676/logs", {
        method: 'POST',
        body: formData,
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err))
};