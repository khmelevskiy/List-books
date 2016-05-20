$( document ).ready(function() {
	var lengthLS = localStorageMax();
	for (var i = 0; i < lengthLS; i++) {
		if(localStorage.key(i)!=null) {
			var key = localStorage.key(i);
			var data = JSON.parse(localStorage[key]);
			var div=document.getElementById("items");
			var button=document.getElementById("addBook");

			var newitem = `<div class="form-group" style="margin-bottom:15px;" id="book${key}">
			<strong style="margin-right: 25px;">Author:</strong>
			<input type="text" readonly="true" value="${data.author}" class="author">
			<br>
			<strong>Name book:</strong>
			<input type="text" readonly="true" value="${data.nameBook}" class="nameBook">
			<br>
			<input type="hidden" class = "publicationDate" value="${data.publicationDate}">
			<input type="hidden" class = "numberOfPages" value="${data.numberOfPages}">
			<input type="button" class="btn btn-primary" style="margin-left:-10px;" onclick="RemoveItem('#book${key}',${key});" value="remove">
			<input type="button" class="btn btn-primary" style="margin-left:3px;" data-toggle="modal" data-target="#myModal" onclick="EditItem(${key},true)" value="edit">
			</div>`;
			var newnode=document.createElement("span");
			newnode.innerHTML=newitem;
			div.insertBefore(newnode,button);
		}
	}
});

function AddItem() {
	if($("#author").val() != '' && $("#publicationDate").val() != '' && $("#nameBook").val() != '' && $("#numberOfPages").val() != '') {
		var items = localStorageMax();
		var author = $("#author").val();
		var publicationDate = $("#publicationDate").val();
		var nameBook = $("#nameBook").val();
		var numberOfPages = $("#numberOfPages").val();
		items++;
		try {
			localStorage[items] = JSON.stringify({author:author, publicationDate:publicationDate,nameBook:nameBook,numberOfPages:numberOfPages});
		}
		catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Локальное хранилище переполнено');
			}
		}
		var div=document.getElementById("items");
		var button=document.getElementById("addBook");
		var newitem = `<div class="form-group" style="margin-bottom:15px;" id="book${items}">
		<strong style="margin-right: 25px;">Author:</strong>
		<input type="text" readonly="true" value="${author}" class="author">
		<br>
		<strong>Name book:</strong>
		<input type="text" readonly="true" value="${nameBook}" class="nameBook">
		<br>
		<input type="hidden" class = "publicationDate" value="${publicationDate}">
		<input type="hidden" class = "numberOfPages" value="${numberOfPages}">
		<input type="button" class="btn btn-primary" style="margin-left:-10px;" onclick="RemoveItem('#book${items}',${items});" value="remove">
		<input type="button" class="btn btn-primary" style="margin-left:3px;" data-toggle="modal" data-target="#myModal" onclick="EditItem(${items},false)" value="edit">
		</div>`;
		var newnode=document.createElement("span");
		newnode.innerHTML=newitem;
		div.insertBefore(newnode,button);
	}
	else {
		alert('Заполните все поля!');
	}
};

function RemoveItem(id,number) {
	$(id).remove();
	localStorage.removeItem(number);
}

function EditItem(key,chooseData) {
	$('#modalEdit').modal('show');
	$('#myModal').on('hidden.bs.modal', function (e) {
		$('#modalEdit').modal('hide');
	});
	if(chooseData) {
		var data = JSON.parse(localStorage[key]);

		$("#authorEdit").val(data.author);
		$("#publicationDateEdit").val(data.publicationDate);
		$("#nameBookEdit").val(data.nameBook);
		$("#numberOfPagesEdit").val(data.numberOfPages);
		$("#hideField").val(key);
	}
	else {
		$("#authorEdit").val($('#book'+key + '> input.author').val());
		$("#nameBookEdit").val($('#book'+key + '> input.nameBook').val());
		$("#publicationDateEdit").val($('#book'+key +'> input.publicationDate').val());
		$("#numberOfPagesEdit").val($('#book'+key + '> input.numberOfPages').val());
		$("#hideField").val(key);
	}
};

function saveChange() {
	if($("#authorEdit").val() != '' && $("#publicationDateEdit").val() != '' && $("#nameBookEdit").val() != '' && $("#numberOfPagesEdit").val() != '') {
		var key = $("#hideField").val();
		localStorage[key] = JSON.stringify({author:$("#authorEdit").val(), publicationDate:$("#publicationDateEdit").val(),
			nameBook:$("#nameBookEdit").val(),numberOfPages:$("#numberOfPagesEdit").val()});

		$('#book'+key + '> input.author').val($("#authorEdit").val());
		$('#book'+key + '> input.nameBook').val($("#nameBookEdit").val());
		$('#book'+key + '> input.publicationDate').val($("#publicationDateEdit").val());
		$('#book'+key + '> input.numberOfPages').val($("#numberOfPagesEdit").val());

		$('#myModal').modal('hide')
		$('#modalEdit').modal('hide');
	}
	else
		alert('Заполните все поля!');
}

function localStorageMax() {
	var max = 0;
	for (var i = 0; i < localStorage.length; i++) {
		if (Number(localStorage.key(i)) > max)
			max = Number(localStorage.key(i));
	}
	return max;
}
