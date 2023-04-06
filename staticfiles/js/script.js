function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getCash() {
    let total_sum = document.getElementById('total_sum')
    let params = "total_sum=" + total_sum.value
    let host = window.location.host;
    let xhr = new XMLHttpRequest()
    let token = getCookie("csrftoken")
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText)
            if (response.error){
                document.getElementById('issued_banknotes').value = response.error
            } else {
                document.getElementById('issued_banknotes').value = response.data
            }
        }
    }
    xhr.open("GET", 'http://' + host + '/count/' + "?"+ params);
    xhr.send()
}