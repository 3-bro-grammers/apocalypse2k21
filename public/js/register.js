var query_par = new URLSearchParams(window.location.search);
var event_name = query_par.get("event_name");
var event_categ = query_par.get("categ");

fetch("data/event_details.json").then((res) => res.json()).then((event_data) => {

    event_name_div.innerHTML = event_name;
    event_desc_div.innerHTML =  event_data[event_categ][event_name]["long_desc"];
    event_img.src = "images/events/"+event_data[event_categ][event_name]["img"]+".jpg";
    organiser_list.innerHTML = event_data[event_categ][event_name]["organisers"].map(e=>(`
        <tr><td class="font-weight-bold">${e[0]}</td><td><i class="fa fa-phone"></i></td><td>${e[1]}</td></tr>
    `)).join(" ")

})




