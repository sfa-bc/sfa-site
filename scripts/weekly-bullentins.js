$(function () {
    $.ajax({
        url: "https://api.github.com/repos/sfa-bc/sfa-site/contents/bulletins",
        success: function (data) {
            data.forEach(bulletin => {
                addBulletin(bulletin);
            });            
        }
    });

    function addBulletin(bulletin) {

        var bulletinList = $("#bulleting-list > tbody")
        console.assert(bulletinList);

        var dateString = getBulletinDate(bulletin.name);
        var friendlyName = getBulletinFriendlyName(bulletin.name);

        var tr = `<tr>
                    <td scope="row">${dateString}</td>
                    <td><a href="weekly-bulletin.html?bulletin=${bulletin.path}">${friendlyName}</a></td>
                  </tr>`;

        bulletinList.append(tr);
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

                dateString = `${day}-${month}-${year}`;
            }
            else {
                console.warn(`Incorrect number of date components included as part of the filename. ${bulletinName}`);
            }
        }
        else {
            console.warn(`Failed to locate the date as part of the filename. ${bulletinName}`);
        }

        return dateString;
    }

    function getBulletinFriendlyName(bulletinName) {

        var friendlyName = bulletinName;

        // Expected naming convention "yyyy-mm-dd name of file.html | .htm"
        var regex = /\D*\d+\D\d+\D\d+/;
        var datePart = regex.exec(bulletinName.trim());
        if (datePart && datePart.length > 0) {
            var extensionLength = 0;
            if (bulletinName.toLowerCase().endsWith(".html")) {
                extensionLength = -5;
            }
            else if (bulletinName.toLowerCase().endsWith(".htm")) {
                extensionLength = -4;
            }
            friendlyName = bulletinName.slice(datePart[0].length, extensionLength).trim(); // -5 => .html | -4 => .htm
        }
        else {
            console.warn(`Failed to locate the date as part of the filename. ${bulletinName}`);
        }
        
        return friendlyName;
    }
});