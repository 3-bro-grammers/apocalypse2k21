var query_par = new URLSearchParams(window.location.search);
var event_name = query_par.get("event_name");
console.log(1)


fetch("data/event_details.json").then((res) => res.json()).then((event_data) => {

    for (event_categ in event_data) {
        var categ_inner = "";
        for (tech_event in event_data[event_categ]) {
            if (tech_event.indexOf("TECHNOCRAT") > -1)
                continue;
            let isresult = event_data[event_categ][tech_event]["result"];
            let innertext =  isresult ? "View Results" :  "REGISTER";
            let btn_class = isresult ? "res_dec":"";
            let btn_display = event_categ == "workshops"? "none" : "block";
            categ_inner += `<div class="card m-3 event-card" style="width: 18rem;">
            <img src="images/events/${event_data[event_categ][tech_event]['img']}.jpg" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${tech_event}</h5>
                    <p class="card-text">${event_data[event_categ][tech_event]["short_desc"]}</p>
                    <button onclick="register_clk('${tech_event}','${event_categ}')" class="form-control ${btn_class}" id="submit-button" style = "display: ${btn_display}">${innertext}</button>
                </div>
            </div>`
        }

        document.getElementById(event_categ + "_cont_div").innerHTML = categ_inner;
    }

    if(event_data["non_tech_events"]["MR AND MS TECHNOCRAT"]["result"]){
        document.querySelector("#mega-event button").innerHTML = "View Results";
        document.querySelector("#mega-event button").classList.add('res_dec')
    }
    
    

    document.getElementById(event_name).click();

});

function register_clk(event_name, event_categ) {
    location.href = `register.html?event_name=${event_name}&categ=${event_categ}`;
}