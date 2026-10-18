$(function () {
    $.ajax({
        url: "https://api.github.com/repos/sfa-bc/sfa-site/contents/bulletins",
        success: function (data) {
            // Naming convention stores bulletins in date order,
            // reverse it so the newest are at the top
            for (var i = data.length - 1; i >= 0; i--) {
                var bulletin = data[i];
                addBulletin(bulletin);
            }
        }
    });

    function addBulletin(bulletin) {
        if (bulletin.type !== "file") {
            return;
        }

        var bulletinList = $("#bulleting-list > tbody");
        console.assert(bulletinList.length > 0);

        var dateString = getBulletinDate(bulletin.name);
        var friendlyName = getBulletinFriendlyName(bulletin.name);

        if (friendlyName.trim() !== "") {
            var bulletinUrl = getBulletinUrl(bulletin);
            var tr = "<tr><td scope=\"row\">" + dateString + "</td>";
                tr += "<td><a href=\"" + bulletinUrl + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + friendlyName + "</a></td>";
                tr += "</tr>";

            bulletinList.append(tr);
        }
    }

    function getBulletinUrl(bulletin) {
        var fileName = bulletin.name.toLowerCase();

        if (endsWith(fileName, ".pdf")) {
            return bulletin.download_url || "https://github.com/sfa-bc/sfa-site/raw/main/" + bulletin.path;
        }

        return "weekly-bulletin.html?bulletin=" + encodeURIComponent(bulletin.path);
    }

    function getBulletinDate(bulletinName) {

        var dateString = "";

        // Expected naming convention "yyyy-mm-dd name of file.html"
        var regex = /\d+\D\d+\D\d+/;
        var datePart = regex.exec(bulletinName.trim());
        if (datePart && datePart.length > 0) {
            var dateTokens = datePart[0].split(/\D/);

            if (dateTokens && dateTokens.length >= 3) {
                var year = dateTokens[0];
                var month = dateTokens[1];
                var day = dateTokens[2];

                dateString = day + "-" + month + "-" + year;
            }
            else {
                console.warn("Incorrect number of date components included as part of the filename. " + bulletinName);
            }
        }
        else {
            console.warn("Failed to locate the date as part of the filename. " + bulletinName);
        }

        return dateString;
    }

    function getBulletinFriendlyName(bulletinName) {

        // Expected naming convention "yyyy-mm-dd name of file.html | .htm | .pdf"
        var regex = /\D*\d+\D\d+\D\d+/;
        var datePart = regex.exec(bulletinName.trim());
        if (datePart && datePart.length > 0) {
            var extensionLength = 0;
            if (endsWith(bulletinName.toLowerCase(), ".html")) {
                extensionLength = -5;
            }
            else if (endsWith(bulletinName.toLowerCase(), ".htm")) {
                extensionLength = -4;
            }
            else if (endsWith(bulletinName.toLowerCase(), ".pdf")) {
                extensionLength = -4;
            }

            var friendlyName = bulletinName.slice(datePart[0].length, extensionLength).trim();
            return friendlyName;
        }
        else {
            console.warn("Failed to locate the date as part of the filename. " + bulletinName);
        }

        return "";
    }

    function endsWith(s, suffix) {
        return s.indexOf(suffix, s.length - suffix.length) !== -1;
    }
});