$(function () {

    var url = window.location.href;
    var bulletinPath = getParameterByName(url, "bulletin");

    if (!bulletinPath) {
        $("#bulletin-content").html("<p>No bulletin selected.</p>");
        return;
    }

    var lowerPath = bulletinPath.toLowerCase();

    if (lowerPath.endsWith(".pdf")) {
        var pdfUrl = bulletinPath.indexOf("http") === 0
            ? bulletinPath
            : "https://raw.githubusercontent.com/sfa-bc/sfa-site/gh-pages/" + bulletinPath.replace(/^\/+/, "");

        var googleViewerUrl = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(pdfUrl);

        $("#bulletin-content").html(
            '<div class="bulletin-pdf-viewer">' +
            '<iframe src="' + googleViewerUrl + '" width="100%" height="900" style="border: none;" title="Bulletin PDF"></iframe>' +
            '<p class="mt-2"><a href="' + pdfUrl + '" target="_blank" rel="noopener noreferrer">Open PDF in a new tab</a></p>' +
            '</div>'
        );
        return;
    }

    $("#bulletin-content").load(encodeURI(bulletinPath));

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