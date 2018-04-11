$(function () {

    var url = window.location.href;
    var bulletinUrl = getParameterByName(url, "bulletin");

    $("#bulletin-content").load(encodeURI(bulletinUrl));

    function getParameterByName(url, name) {

        var parameter = null;

        name = name.replace(/[\[\]]/g, "\\$&");

        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);

        if (results && results.length > 1 && results[2]) {
            parameter = decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        return parameter;
    }
});