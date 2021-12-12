var query_par = new URLSearchParams(window.location.search);
var event_name = query_par.get("event_name");
console.log(1)


fetch("data/event_details.json").then((res) => res.json()).then((event_data) => {

    for (event_categ in event_data) {
        var categ_inner = "";
        for (tech_event in event_data[event_categ]) {
            categ_inner += `<div class="card m-3" style="width: 18rem;">
            <img src="images/events/${event_data[event_categ][tech_event]['img']}.jpg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${tech_event}</h5>
                    <p class="card-text mb-5">${event_data[event_categ][tech_event]["short_desc"]}</p>
                    <button onclick="register_clk('${tech_event}','${event_categ}')" class="form-control" id="submit-button">REGISTER</button>
                </div>
            </div>`
        }

        document.getElementById(event_categ+"_cont_div").innerHTML = categ_inner;
    }

    document.getElementById(event_name).click();
    
});

function register_clk(event_name, event_categ){
    location.href = `register.html?event_name=${event_name}&categ=${event_categ}`;
}