let button = document.getElementById("submit-btn");
const baseUrl = "http://192.168.1.10:45458";
let globalLoginData;
button.addEventListener("click", function () {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    if (!nameInput.value) {
        nameInput.classList.add("is-invalid");
        document.getElementById("name-text").style.display = "block";
    } else {
        nameInput.classList.remove("is-invalid");
        document.getElementById("name-text").style.display = "none";
    }
    if (!lastNameInput.value) {
        lastNameInput.classList.add("is-invalid");
        document.getElementById("lastname-text").style.display = "block";
    } else {
        lastNameInput.classList.remove("is-invalid");
        document.getElementById("lastname-text").style.display = "none";
    }
    if (nameInput.value && lastNameInput.value) {
        // alert("Hello my name is " + nameInput.value + " " + lastNameInput.value);
        // let row = document.createElement("tr");
        // let nameElement = document.createElement("td");
        // nameElement.innerText = nameInput.value;
        // let lastnameElement = document.createElement("td");
        // lastnameElement.innerText = lastNameInput.value;
        // row.appendChild(nameElement);
        // row.appendChild(lastnameElement);
        // document.getElementById("table-body").appendChild(row);
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: nameInput.value,
                password: lastNameInput.value,
            }),
        };
        fetch(baseUrl + "/api/auth/login", options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong");
                }
            })
            .then(function (loginData) {
                globalLoginData = loginData;
            });
    }
});
const getWeather = () => {
    if (globalLoginData) {
        const options = {
            headers: { Authorization: `Bearer ${globalLoginData.token}` },
        };
        fetch(baseUrl + "/api/weatherforecast", options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong");
                }
            })
            .then(function (weatherData) {
                console.log(weatherData);
            });
    }
};
document.getElementById("getweather").addEventListener("click", getWeather);