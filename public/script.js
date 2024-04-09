var newImg, showImg;

alert("select only images")
function loadImg(event) {

	showImg = document.getElementById('showImg');

	showImg.src = URL.createObjectURL(event.target.files[0]);

	newImg = document.createElement('img');

	newImg.src = URL.createObjectURL(event.target.files[0]);

	showImg.onload = function () {

		URL.revokeObjectURL(showImg.src)
	}
	if (typeof uploadImg !== '.mp4' && typeof uploadImg.extension !== '.mp4') {
		// Chrome extension is supported
		alert('input is not supported.');
	}
}
function pdfDown() {

	console.log(newImg);

	var doc = new jsPDF();

	doc.addImage(newImg, 10, 10);

	doc.save('imgtopdf.pdf');
}