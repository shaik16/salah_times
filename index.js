function submitForm() { 
var pat=/^[A-Za-z]+$/;
var val=$("#loc").val();
var ok=val.search(pat);
if(ok)
    alert("Please enter location name correctly");
else    
    $("form").attr("method", "POST");
};