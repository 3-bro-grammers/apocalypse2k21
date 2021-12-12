var query_par = new URLSearchParams(window.location.search);
var event_name = query_par.get("event_name");
var event_categ = query_par.get("categ");

var memb_cnt = 1;

fetch("data/event_details.json").then((res) => res.json()).then((event_data) => {

    event_name_div.innerHTML = event_name;
    event_desc_div.innerHTML = event_data[event_categ][event_name]["long_desc"];
    event_img.src = "images/events/" + event_data[event_categ][event_name]["img"] + ".jpg";
    organiser_list.innerHTML = event_data[event_categ][event_name]["organisers"].map(e => (`
        <tr><td class="font-weight-bold">${e[0]}</td><td><i class="fa fa-phone"></i>&nbsp;&nbsp;${e[1]}</td></tr>
    `)).join(" ")

})


function change_member_cnt(inc) {

    if ((memb_cnt == 0 && !inc) || (memb_cnt == 2 && inc)) {
        return;
    }
    memb_cnt = inc ? memb_cnt + 1 : memb_cnt - 1;
    for (i = 1; i <= 2; i++) {
        document.getElementById(`member${i}`).classList.remove('d-flex');
        document.getElementById(`member${i}`).classList.add('d-none');
    }

    for (i = 1; i <= memb_cnt; i++) {
        document.getElementById(`member${i}`).classList.add('d-flex');
        document.getElementById(`member${i}`).classList.remove('d-none');

    }

    memb_cnt_span.innerHTML = memb_cnt;
}

function register_clk() {

    var team_arr = [];

    team_arr.push([leader_name_txt.value, leader_reg_txt.value]);

    for(i = 1; i<=memb_cnt; i++){

        team_arr.push([  document.getElementById(`memb${i}_name_txt`).value, document.getElementById(`memb${i}_reg_txt`).value]);
    }

    fetch("https://3pwqbbrx6f.execute-api.us-east-2.amazonaws.com/default/apocalypse-register", {
        method: "POST",
        body: JSON.stringify({
            event_categ: event_categ,
            event_name: event_name,
            team: team_arr,
            dept: dept_select.value,
            phone: phone_txt.value,
            email: email_txt.value
        })
    })
}



