require('./index').handler({
    body: JSON.stringify({
        event_categ: "tech",
        event_name : "adscsd",
        team : [["name1","27018501456"],["name2","2019632564"],[]],
        dept:"Electronics",
        phone: "454334545",
        email: "asdfsdf@gmail.com"
    })
}).then(res => {
    console.log(res);
})