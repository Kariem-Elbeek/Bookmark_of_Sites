var siteNameInput = document.getElementById('siteNameInput');
var siteURLInput = document.getElementById('siteURLInput');
var bookmarksList = document.getElementById('bookmarksList');
var siteNameAlert = document.getElementById('siteNameAlert');
var siteURLAlert = document.getElementById('siteURLAlert');

var bookmarksContainer = []

if (localStorage.getItem('bookmarksList') != null){
    bookmarksContainer = JSON.parse(localStorage.getItem('bookmarksList'));
    displayBookmarks();
} 
else {
    bookmarksContainer = [];
}


function submitBookmark(){
    var bookmark = {
        siteName: siteNameInput.value,
        siteURL: siteURLInput.value,
    }
    
    clearAlerts();

    if (siteNameInput.value == ''){
        alertName('Bookmark Name is required!');
    }
    else if (searchSite() == true){
        alertName('Name was saved before!');    
    }
    else if (siteURLInput.value == ''){
        alertURL('Site URL is required!')
    }
    else if (siteURLInput.value.match(/^(http|www.)/) == null){
        alertURL('Insert correct URL!')
    }
    else {
        bookmarksContainer.unshift(bookmark);
        localStorage.setItem('bookmarksList', JSON.stringify(bookmarksContainer));
        displayBookmarks();
        clearInputs();
    }
}

function alertName(alertStatement){
    siteNameAlert.innerHTML = alertStatement;
}

function searchSite(){
    var result = false;
    for (i = 0; i < bookmarksContainer.length; i++){
        if (bookmarksContainer[i].siteName.toLowerCase() == siteNameInput.value.toLowerCase()){
            result = true;
        }
    }
    return result;
}
function alertURL(alertExpression){
    siteURLAlert.innerHTML = alertExpression;
}

function clearAlerts(){
    siteNameAlert.innerHTML = '';
    siteURLAlert.innerHTML = '';
}

function clearInputs(){
    siteNameInput.value = '';
    siteURLInput.value = '';
}

function displayBookmarks(){
    tempContainer = ''
    for (i =0; i < bookmarksContainer.length; i++){
        tempContainer += `<div class="bookmark mx-5 my-3 py-4 bg-secondary bg-opacity-25 d-flex align-items-center">
        <h4 class="w-25 fw-bold ps-2">${bookmarksContainer[i].siteName}</h4>
        <button class="px-3 py-1 rounded-2 mx-1 bg-primary"><a href="${bookmarksContainer[i].siteURL}" class="text-decoration-none text-white" target="_blank">visit</a></button>
        <button class="px-3 py-1 rounded-2 mx-1 bg-danger" onclick="deleteBookmark(${i})">Delete</button>
    </div>`;
    }
    bookmarksList.innerHTML = tempContainer;
}

function deleteBookmark(deletedBookmark){
    bookmarksContainer.splice(deletedBookmark, 1);
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarksContainer));
    displayBookmarks();
}