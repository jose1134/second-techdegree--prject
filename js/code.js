// These vairables contain the class for the student list and students that are being used down below in the functions that are called
// The students for each page vairable holds how many students nee to be display on the page 
// The student per page does the math in taking the total amount of students divdied by the how many students supposed to be on each page and rounds the number up
// that is used for creating the number of links

// the empty array called studentgroup is used for a function down below

const studentlist = $('.student-list'); 
const studentItems = $('.student-item');
const pageLinkClass = $(".pagination");
let studentsForEachPage = 10;
let studentsPerPage = Math.ceil(studentItems.length /studentsForEachPage);
let studentGroup = [];


// this function creates all the elements that needed to be added to the dom and creates the class for certain elements that are going to be used.
function Elements(){
	const pagediv = document.createElement('div'); 
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
	
	//This creates the no result div and class in which our no result text wouldbe added and pop up when we need it to
	const noResultDiv = document.createElement('div');
	noResultDiv.className = 'noresult';
	$('.student-list').prepend(noResultDiv);

	// this makes the cursor over the button turn into a pointer so we now the button is being hovered over
	$('.student-search button').css('cursor', 'pointer');
}

//this is a simple function that hides the students when the process to run everything comes around
function hidestudents(){ 
	studentItems.hide();
	
}

// this function is created to create the links of the pages based on how many pages there are.
// it loops through the students per page vairable that was created up top and adds a number to the pagehtml variable that was created. 
// it is then added to where the page placement is on the index of the page and adds the html to the element. 
function pagelinks(studentsPerPage){
	const pageButtonsPlace = document.querySelector('.pagination ul');
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

// This function takes what page number is being display at the time and then shows the 10 students it is supposed to.
// it takes the first index student  times the page and the same with the last then adds them to a variable 
// the variables are used as a stopping point so when it is on a certain page, so it shows the 10 it has to based on what page the user is on.
function displayStudents(page, studentsToDisplay) {
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


//this is where all the functions are called to make everything on the page run
hidestudents();
Elements();
pagelinks(studentsPerPage)
displayStudents(1, studentItems);


//this is where all the click events happen 


//this is a click/key event 
//this was created based on when the user uses the search bar to type in a name and presses the enter key to enable the search
$('.student-search input').keyup(function(e){
	//the variables created were to get the input element and whats its value inside and make it lower case
	//the next variables gets the no result class and stores them in this function and adds the no result function 
	//the student display array is empty for now until a subject is found and placed inside
	const value = document.querySelector('input').value.toLowerCase();
	const studentDetails = document.querySelectorAll('.student-details');
	const NoResultClass = $('.noresult');
	NoResultClass.text('No Result Found');
	let StudentDisplay = [];
	// this is the function to call the enter key event when its pressed 
	if (e.which === 13){
		if (value !== ''){
			//this checks for if the value of the input is an empty string 
			//which it then loops through all the students if the input is not an empty string
			for (let i = 0; i < studentDetails.length; i++){
				//some variables are created to get the name and email of the each of the looped students
				const studentName = studentDetails[i].querySelector('h3').textContent;
				const studentEmail =  studentDetails[i].querySelector('span').textContent;
				// this if condition checks if the input value is equal to either the emails or the name
				if (studentName.indexOf(value) > -1 || studentEmail.indexOf(value) > -1){
					//if either of the name or the email matches it will then be sent over to the empty array called StudentDisplay and adds it to the array
					//which it will then hide the no result text and display the student(s) that were matched to the value of the input
					studentDetails[i].parentNode.style.display = 'block';
					StudentDisplay.push(studentDetails[i].parentNode);
					NoResultClass.hide();
				} else {
					//this is created just in case the matching gets an error so it hides the students and the no result text and shows nothing
					studentDetails[i].parentNode.style.display = 'none';
					NoResultClass.hide();
				}
			}
			// this is called upon when the input value does not have a match in which it hides all the students 
			//and returns the text 'no result found' using a fade in effect and bolded out in css
			if (StudentDisplay.length == 0){
				studentItems.hide();
				NoResultClass.fadeIn();
			}
		} else {
			//if the input value is empty the no result text is hidden and the page is just ran normally
			//and sends the user to the first page everytime the event is enabled by clicking on the button or pressing enter in the search bar
			NoResultClass.hide()
			hidestudents();
			pagelinks(studentsPerPage)
			displayStudents(1, studentItems);
		}	
	} else {
		//if the input value is empty the no result text is hidden and the page is just ran normally
		//and sends the user to the first page everytime the event is enabled by clicking on the button or pressing enter in the search bar
		NoResultClass.hide()
		hidestudents();
		pagelinks(studentsPerPage)
		displayStudents(1, studentItems);
	}
	
// everything that happened in the enter/keypress event happens with clicking the search button as well
// all the functions are called the same and everything is ran the same
});
$('.student-search button').click(function(){
	const value = document.querySelector('input').value.toLowerCase();
	const NoResultClass = $('.noresult');
	NoResultClass.text('No Result Found');
	let StudentDisplay = [];
	const studentDetails = document.querySelectorAll('.student-details');
	if (value !== ''){
		for (let i = 0; i < studentDetails.length; i++){
			const studentName = studentDetails[i].querySelector('h3').textContent;
			const studentEmail =  studentDetails[i].querySelector('span').textContent;
			if (studentName.indexOf(value) > -1 || studentEmail.indexOf(value) > -1){
				studentDetails[i].parentNode.style.display = 'block';
				StudentDisplay.push(studentDetails[i].parentNode);
				NoResultClass.hide();
			} else {
				studentDetails[i].parentNode.style.display = 'none';
				NoResultClass.hide();
			}
		} 
		if (StudentDisplay.length == 0){
			studentItems.hide();
			NoResultClass.fadeIn();
		}
	} else {
		NoResultClass.hide()
		hidestudents();
		pagelinks(studentsPerPage)
		displayStudents(1, studentItems);
		
	}
});

//this click event is based off the page link buttons 
//everytime one of the buttons is pressed, the value of the button is sent to the displaystudent function
//which then multiplies the students by the page and display the index number of which students have to show
// it also hides the no result class before and after the no result text is added, so it can only pop up when needed
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
	$('.noresult').hide()
	}
});

