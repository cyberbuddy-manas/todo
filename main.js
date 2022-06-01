var db = firebase.database();

function myTodo(head, desc, id) {
	let div = document.createElement("div");
	div.className = "compo";
	div.id = id;

	let heading = document.createElement("h1");
	heading.innerHTML = head;

	let hr = document.createElement("hr");

	let para = document.createElement("p");
	para.innerHTML = desc;

	let btn = document.createElement("button");
	btn.innerHTML = "Completed!"
	btn.id = id;
	btn.setAttribute("onclick", "delCompo('" + id + "')")

	document.getElementById("todos").appendChild(div);
	div.append(heading, hr, para, btn);
}
// myTodo("Study for the test", "Its the final one so be prepared accordingly. Also you got bad marks the last time you appeared for it do this time its the finale.");

function getData() {
	var heading = document.getElementById('head_todo');
	var description = document.getElementById('desc_todo');

	if (heading.value == "" || description.value == "") {
		alert("Please enter some data for the Todo")
	}
	else {
		myTodo(heading.value, description.value, "hi");
		heading.value = "";
		description.value = "";
	}
}
// document.getElementById("btn_todo").addEventListener('click', getData);

function createCompo() {
	var db = firebase.database();

	db.ref("compo").once("value", (value) => {
		value.forEach((value) => {
			myTodo(value.val().head, value.val().desc, value.val().id);
		});
	});
}

function get_id() {
	const head = document.getElementById("head_todo").value;
	const desc = document.getElementById("desc_todo").value;

	function send_data(id) {
		var db = firebase.database();

		db.ref("compo/component-" + id).set({
			head: head,
			desc: desc,
			id: "component-" + id
		});
	}

	db.ref("id/").once("value", (value) => {
		var id = value.val().id;
		send_data(id);

		++id;
		db.ref("id/").set({
			id: id
		})
		
		myTodo(head, desc, id);
	})


	// getData();
	// createCompo();
}

// createCompo();

function modal_appear() {
	document.querySelector("#modal").style.display = "unset";
}

document.querySelector(".modal").addEventListener("click", () => {
	document.querySelector("#modal").style.display = "none";
})

// setTimeout(modal_appear, 1000)

function delCompo(id) {
	var db = firebase.database();

	// db.ref("compo/" + id).remove();

	localStorage.removeItem(id);
	document.getElementById(id).style.display = "none";
}

function local_storage() {
	const head = document.getElementById("head_todo").value;
	const desc = document.getElementById("desc_todo").value;

	localStorage.setItem("id", parseInt(localStorage.getItem("id")) + 1);

	if (head == "" || desc == "") {
		window.alert("Please enter some data for the Todo");
	}
	else {
		var compo = {
			head: head,
			desc: desc
		};

		var count = localStorage.getItem("id");

		localStorage.setItem("component" + count, JSON.stringify(compo));

		var compo = JSON.parse(localStorage.getItem("components"));

		var id = localStorage.getItem("id");
		var compo = JSON.parse(localStorage.getItem("component" + id));
		myTodo(compo.head, compo.desc, "component" + id);

		head = "";
		desc = "";
	}
}

function displayCards() {
	var id = localStorage.getItem("id");

	for (var i = 1; i <= id; i++) {
		var compo = JSON.parse(localStorage.getItem("component" + i));
		if (compo == null) {
			continue
		}

		myTodo(compo.head, compo.desc, "component" + i);
	}
}

displayCards()