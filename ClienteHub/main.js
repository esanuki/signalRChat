"use strict";

function sendMessage(){
	console.log('Entrou');
	
	var usuario = document.getElementById("nome").value;
	var mensagem = document.getElementById("mensagem").value;
	var myJSon = {"Usuario":usuario, "Mensagem":mensagem };
	
	const ajx = new XMLHttpRequest();
	ajx.open("POST", "https://localhost:44373/Chat",true);
	ajx.setRequestHeader('Content-Type','application/json');
	ajx.send(JSON.stringify(myJSon));
	
	// $.ajax({
                    // console.log('Olá');
					// var usuario = document.getElementById("nome").value;
					// var mensagem = document.getElementById("mensagem").value;
					// var myJSon = {"Usuario":usuario, "Mensagem":mensagem };
                    // type: "POST",
                    // url: 'https://localhost:44373/Chat',
                    // dataType: "json",
                    // data: JSON.stringify(myJSon),
                    // sucess: function (data){
                        
                    // },
                    // error: function () {
                        // alert('Error');
                    // }
        // });
		document.getElementById("mensagem").value = '';
		document.getElementById("mensagem").focus();
		
}
var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44373/chat", {
	
	skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
}).build();

connection.on("Chat", function (message) {
    console.log(message);
	var msg = message.usuario + ' => ' + message.mensagem;
	
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);
});

async function start() {
    try {
        await connection.start();
		await connection.invoke("HandShake", "123abc");
        var li = document.createElement("li");
        li.textContent = "Connetado!";
        document.getElementById("messagesList").appendChild(li);
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

start();

// connection.start().then(function () {
    // await connection.invoke("HandShake","123abc");
	// var li = document.createElement("li");
    // li.textContent = "Connetado!";
    // document.getElementById("messagesList").appendChild(li);
// }).catch(function (err) {
    // return console.error(err.toString());
// });


