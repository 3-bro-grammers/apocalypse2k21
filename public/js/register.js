var query_par = new URLSearchParams(window.location.search);
var event_name = query_par.get("event_name");
var event_categ = query_par.get("categ");
var dept = {
    "Electronics and Communication": "ECE",
    "Aeronautical Engineering": "AERO",
    "Automobile Engineering": "AUTO",
    "Computer science": "CT",
    "Electronics and instrumentation": "E&I",
    "Information Technology": "IT",
    "Mechanical Engineering": "MECH",
    "Production Technology": "PT",
    "Rubber and Plastic Technology": "RPT"
};

var single_event = ["VOICE OVER", "MEME CONTEST", "MR AND MS TECHNOCRAT", "PHOTOGRAPHY", "MOVIE REVIEW", "CASE CHALLENGE"];
if (event_categ == "workshops" || single_event.indexOf(event_name) > -1 || (event_categ == "tech_events" && event_name != "PROJECTINA" && event_name != "PROS AND CONS" && event_name != "DIGI-LOGI")) {
    document.getElementById("mem_btn").style.display = "none";
    document.getElementById("leader_name_txt").placeholder = "Name";
}

var memb_cnt = 0;
var required = ["leader_name_txt", "leader_reg_txt", "email_txt", "phone_txt"];
var img_name;

fetch("data/event_details.json", { cache: 'no-cache' }).then((res) => res.json()).then((event_data) => {

    img_name = event_data[event_categ][event_name]["img"];
    event_name_div.innerHTML = event_name;
    event_desc_div.innerHTML = event_data[event_categ][event_name]["long_desc"];
    event_img.src = "images/events/" + img_name + ".jpg";
    organiser_list.innerHTML = event_data[event_categ][event_name]["organisers"].map(e => (`
        <tr><td class="font-weight-bold">${e[0]}</td><td><a href="tel:${e[1]}"><i class="fa fa-phone"></i>&nbsp;&nbsp;${e[1]}</a></td></tr>
    `)).join(" ");
    if (event_data[event_categ][event_name]["result"])
        show_results(event_data[event_categ][event_name]["result"]);
    else {
        reg_nav.innerHTML = "REGISTER";
        if (!event_data[event_categ][event_name]["closed"]) {
            document.getElementById("inputs").reset();
            document.getElementById("inputs").style.display = "block";
            reg_title.innerHTML = "Register Now";

        }
        else {
            reg_closed.style.display = "block";
            reg_title.innerHTML = "Registrations Closed";
        }
    }



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
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function register_clk() {
    document.getElementById("submit-button").disabled = true;
    error.innerHTML = "";
    var team_arr = [];
    var valid = true;
    var error_msg = "Please Fill all the required details";
    var email = document.getElementById("email_txt").value;
    if (!validateEmail(email)) {
        valid = false;
        error_msg = "Invalid E-mail address";
    }
    required.forEach((e, i) => {
        if (!document.getElementById(e).value) {
            valid = false;
            return;
        }
    });
    if (document.getElementById('phone_txt').value.length != 10 || document.getElementById("leader_reg_txt").value.length != 10) {
        valid = false;
        error_msg = "Phone no. and Register no. should be 10 digits";
    }
    for (i = 1; i <= memb_cnt && valid; i++) {
        if (!document.getElementById(`memb${i}_name_txt`).value || !document.getElementById(`memb${i}_reg_txt`).value) {
            valid = false;
            break;
        }
        if (document.getElementById(`memb${i}_reg_txt`).value.length != 10) {
            valid = false;
            error_msg = "Phone no. and Register no. should be 10 digits";
            break;
        }
    }
    if (!valid || dept_select.value == "default") {
        error.innerHTML = error_msg;
        error.style.display = "block";
        document.getElementById("submit-button").disabled = false;
        return;
    }

    error.style.display = "none";
    team_arr.push([leader_name_txt.value, leader_reg_txt.value]);

    for (i = 1; i <= memb_cnt; i++) {

        team_arr.push([document.getElementById(`memb${i}_name_txt`).value, document.getElementById(`memb${i}_reg_txt`).value]);
    }
    loader.style.display = "inline-block";
    fetch("https://3pwqbbrx6f.execute-api.us-east-2.amazonaws.com/default/apocalypse-register", {
        method: "POST",
        body: JSON.stringify({
            event_categ: event_categ,
            event_name: event_name,
            img: img_name,
            team: team_arr,
            dept: dept_select.value,
            phone: phone_txt.value,
            email: email_txt.value
        })
    }).then(res => res.text()).then(data => {
        loader.style.display = "none";
        document.getElementById("submit-button").disabled = false;
        if (data == "DONE") {
            Swal.fire(
                'Success',
                'Registration Successful',
                'success'
            ).then(() => location.href = "/");
        }
        else {
            Swal.fire(
                'Oops!',
                'Please Try again later',
                'error'
            );
        }
    })

}
function show_results(event_result) {
    reg_nav.innerHTML = "Results";
    reg_title.innerHTML = "Results";
    document.getElementById("results_cont").style.display = "block";
    console.log(event_result);
    winner_dept.innerHTML = event_result[0][0][2];
    runner_dept.innerHTML = event_result[1][0][2];
    if (event_result[2]) {
        runner2_dept.innerHTML = event_result[2][0][2];

        var runner2_div_txt = "";


        event_result[2].forEach((memb, i) => {

            runner2_div_txt += `<div class="d-flex flex-column">
                <div class="font-weight-bold">${memb[0]}</div>
                <div>${memb[1]}</div>
            </div>`
        });

        runner2_div_list.innerHTML = runner2_div_txt;


    }else{
        runner2_div_main.style.display = "none";
    }


    var winner_div_txt = "";
    event_result[0].forEach((memb, i) => {

        winner_div_txt += `<div class="d-flex flex-column">
            <div class="font-weight-bold">${memb[0]}</div>
            <div>${memb[1]}</div>
        </div>`
    });

    winner_div_list.innerHTML = winner_div_txt;

    var runner_div_txt = "";


    event_result[1].forEach((memb, i) => {

        runner_div_txt += `<div class="d-flex flex-column">
                <div class="font-weight-bold">${memb[0]}</div>
                <div>${memb[1]}</div>
            </div>`
    });

    runner_div_list.innerHTML = runner_div_txt;

    if (event_name == "MR AND MS TECHNOCRAT") {
        winner_title.innerHTML = "Mr. TECHNOCRAT"
        runner_title.innerHTML = "Ms. TECHNOCRAT"

        runner_div_list.classList.add('winner_div_list')
        runner_div_main.classList.remove('runner-div')
        runner_div_main.classList.add('winner-div')

        runner_icon.style.color = "gold";

        runner2_div_main.style.display = "none";
    }

    if (results_cont.offsetHeight > results_cont.offsetWidth) {
        document.querySelector('.results-back').style.width = "auto";
        document.querySelector('.results-back').style.height = "100%";

    }
}

setTimeout(() => {
    document.querySelector('.results-back').style.top = "100%";
}, 10000)

//[[["Kumar","2018504620","Electronics and Communication"],["Sam","regno"],["Sanju","regno"]],[["Name3","regno","Computer science"]]]
