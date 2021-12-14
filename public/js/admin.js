var pass;

var event_data;

var clear_cont_interval;

fetch("data/event_details.json").then((res) => res.json()).then((data) => {

    event_data = data;
    event_categ_select_change();
})



function input_pass(err) {
    Swal.fire({
        title: 'Enter ADMIN password',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        footer: err ? 'Password Error!' : undefined
    }).then((res) => {

        if (res.value != "APOCALYPSE_ADMIN") {
            input_pass(true)
        }else{
            clearInterval(clear_cont_interval);
            container_div.style.display = "block";
        }
    })
}

function event_categ_select_change() {

    reg_table.style.display = "none";
    
    var event_select_inner = `<option disabled selected value="default">Select Event</option>`;
    for (x in event_data[event_categ_select.value]) {
        event_select_inner += `<option value="${x}">${x}</option>`
    }

    event_select.innerHTML = event_select_inner;
}

function event_select_change() {

    if (event_select.value == "default")
        return;

    reg_table.style.display = "none";

    fetch(`https://apocalypse-2k21-default-rtdb.firebaseio.com/registerations/${event_categ_select.value}/${encodeURIComponent(event_select.value)}.json`)
        .then((res) => res.json()).then(data => {
            var reg_table_cont_inner = "";

            var s_no = 1;
            // console.log(data)
            for (x in data) {
                var memb_cnt = data[x]["team"].length;
                reg_table_cont_inner +=
                    `<tr>
                        <td rowspan="${memb_cnt}">${s_no}</td>
                        <td>${data[x]["team"][0][0]}</td>
                        <td>${data[x]["team"][0][1]}</td>
                        <td rowspan="${memb_cnt}">${data[x]["email"]}</td>
                        <td rowspan="${memb_cnt}">${data[x]["phone"]}</td>
                        <td rowspan="${memb_cnt}">${data[x]["dept"]}</td>
                    </tr>`

                for (var i = 1; i < memb_cnt; i++) {
                    reg_table_cont_inner +=
                        `<tr>
                            <td>${data[x]["team"][i][0]}</td>
                            <td>${data[x]["team"][i][1]}</td>
                        </tr>`
                }

                s_no++;

            }

            reg_table_cont.innerHTML = reg_table_cont_inner || `<tr><td colspan = "6">No Registrations Yet</tr>`;
            reg_table.style.display = "block";
        })


}

input_pass(false);

function clear_content() {
    container_div.style.display = "none";
}


clear_cont_interval = setInterval(clear_content, 100);