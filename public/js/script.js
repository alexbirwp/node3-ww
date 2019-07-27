
// fetch('/wheather?address=korolev').then((res) => {
//     res.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.info);
//         }
//     })
// });
console.log(1);

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const result = document.querySelector("#result");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    if (/[а-яА-Я]/.test(location)) {
        return result.innerHTML = "Input in English";
    }
    result.innerHTML = "Loading...";
    fetch('/wheather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                result.innerHTML = data.error;
            } else {
                result.innerHTML = data.location + "<br/>" + data.info;
            }
        })
    });
});