$(function(){
  $("#addButton").click(handleBtnClick);  
  $("#todos").on("click","li",removeMe);
});

function handleBtnClick(){
    var newToDo=$("#newToDo").val();
    if(!newToDo){
        $("#newToDo").addClass("error");
        return;
    }
    $("#newToDo").removeClass("error");
    $("#newToDo").val("");
    $("#todos").append("<li>" +newToDo+ "</li>");
   
}
function removeMe(){
    $(this).fadeOut();
}