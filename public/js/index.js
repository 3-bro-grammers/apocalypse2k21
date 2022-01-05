function count () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      dayMonth = "12/22/",
      eventday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  const countDown = new Date(eventday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance =  countDown - now ;
          document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        if (distance <= 0) {
          document.getElementById("headline").style.display= "none";
          document.getElementById("countdown").style.display = "none";
          clearInterval(x);
        }
      }, 0)
  }

  function view_event(event_name){
    location.href = `events.html?event_name=${event_name}`;
}