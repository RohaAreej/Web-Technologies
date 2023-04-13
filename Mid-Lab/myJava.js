console.log("File is Attach here!!");
$(function(){
    console.log("Start Binding");
   $(".logo-left").click(handleFunction);
});

function handleFunction(){
    alert("You clicked logo!!");
}