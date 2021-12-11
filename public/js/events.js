fetch("data/event_details.json").then((res) => res.json()).then((event_data) => {

    for (event_categ in event_data) {
        var categ_inner = "";
        for (tech_event in event_data[event_categ]) {
            categ_inner += `<div class="card m-3" style="width: 18rem;">
            <img src="images/events/${event_data[event_categ][tech_event]['img']}.jpg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${tech_event}</h5>
                    <p class="card-text mb-5">${event_data[event_categ][tech_event]["short_desc"]}</p>
                    <button onclick="register_clk('${tech_event}')" class="form-control" id="submit-button" name="submit">
                    Register</button>
                </div>
            </div>`
        }

        document.getElementById(event_categ+"_cont_div").innerHTML = categ_inner;
    }
})

function register_clk(event_name){
    location.href = `register.html?event_name=${event_name}`
}