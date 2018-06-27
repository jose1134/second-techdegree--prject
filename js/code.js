const studentlist = $('.student-list'); 
const studentItems = $('.student-item');
let studentsForEachPage = 10;
let studentsPerPage = Math.ceil(studentItems.length /studentsForEachPage);
let pageLinkClass = $(".pagination");
let studentGroup = [];


function hidestudents(){ 
	studentItems.hide();
}

function Elements(){
	let pagediv = document.createElement('div'); 
	pagediv.className = 'pagination';
	pagediv.appendChild(document.createElement('ul'))
	const paginationPlace = $(".page").append(pagediv);
	const searchDiv = document.createElement('div');
	const searchButton = document.createElement('button');
	const searchInput = document.createElement('input');
	const searchArea = $('.page-header').append(searchDiv);
	searchDiv.className = 'student-search';
	searchDiv.appendChild(searchInput);
	searchDiv.appendChild(searchButton);
	searchInput.placeholder = 'Search for Students...'
	searchButton.innerHTML = 'Search'
	
	const noResultDiv = document.createElement('div');
}



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
	for (let i = 0 ; i < studentItems.length ; i++ ){
		if (i >= firstStudent && i <= lastStudent){
			studentGroup[i].style.display = 'block';
		} else {
			studentGroup[i].style.display = 'none';
		}
	}
}



hidestudents();
Elements();
pagelinks(studentsPerPage)
displayStudents(1, studentItems);


$('.pagination').click(function(e){
	const target = e.target;
	const buttons = document.querySelectorAll('.pagination ul li a');
	if (target.tagName === 'A'){
		for (let i = 0; i < buttons.length; i++){
			if (buttons[i].innerText != target.innerText ){
				buttons[i].className = '';
		 	} else {
				target.className = 'active';
			}
		}
	displayStudents(parseInt(target.innerText), studentItems);
	}
});

