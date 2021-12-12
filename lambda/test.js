require('./index').handler({
    body: JSON.stringify({
        event_categ: "tech",
        event_name : "event1",
        team : [["name1","27018501456"],["name2","2019632564"]],
        dept:"Electronics",
        phone: "454334545",
        email: "agilanvlr2001@gmail.com",
        img: 'event'
    })
}).then(res => {
    console.log(res);
})