const studentlist = $('.student-list');
const pageClass = $('.page');  
const studentItems = $('.student-item');
let studentsForEachPage = 10;
let studentsPerPage = Math.ceil(studentItems.length /studentsForEachPage);
let studentGroup = [];

function hidestudents(){ 
	studentItems.hide();
}

function Elements(){
	let pagediv = document.createElement('div'); 
	pagediv.className = 'pagination';
	pagediv.appendChild(document.createElement('ul'))
	const paginationPlace = $(".page").append(pagediv);
}
let pageLinkClass = $(".pagination");

function pagelinks(studentsPerPage){
	let pageButtonsPlace = document.querySelector('.pagination ul');
	let pageHtml = ''; 
	for (let i = 1; i <= studentsPerPage; i++){
		pageHtml += '<li>';
		if (i === 1){
			pageHtml += '<a class = "active" href = "#" >' + i  + '</a>';
		} else {
			pageHtml += '<a href = "#">' + i + '</a>';
		}
		pageHtml += '</li>';
	}	
	pageButtonsPlace.innerHTML = pageHtml;
}

function displayStudents(page, studentsToDisplay) {
	let studentListArray = studentGroup.push(studentItems);
	let firstStudent = (page * studentsForEachPage) - 10;
	let lastStudent = (page * studentsForEachPage) - 1;
	studentGroup = studentsToDisplay;
	for (let i = 0 ; i <= studentItems.length ; i++ ){
		if (i >= firstStudent && i <= lastStudent){
			studentGroup[i].style.display = 'block';
		} else {
			studentGroup[i].style.display = "none";
		}
	}
}



// hidestudents();
Elements();
pagelinks(studentsPerPage);
displayStudents(1, studentItems);