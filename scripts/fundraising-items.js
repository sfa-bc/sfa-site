$(function () {
    $.ajax({
        url: "http://www.sfachurch.org.uk/fundraising-items.json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var fundraisingItem = data[i];
                addFundraisingItem(fundraisingItem);
            }
        }
    });

    function addFundraisingItem(fundraisingItem) {

        var fundraisingItemList = $("#fundraising-item-list > tbody")
        console.assert(fundraisingItemList);

        var item = fundraisingItem.item;
        var amount = fundraisingItem.amount;
        var isDonated = fundraisingItem.donated;

        var tr = "<tr>"
        tr += "<td>" + item + "</td>";
        tr += "<td><span class=\"badge badge-primary badge-pill\">" + amount + "</span></td>";

        if (isDonated) {
            tr += "<td><i class=\"fas fa-check-square\"></i></td>";
        }
        else {
            tr += "<td></td>";
        }
        tr += "</tr>";

        fundraisingItemList.append(tr);
    }
});