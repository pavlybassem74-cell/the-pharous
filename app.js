function requestAccess(){
  const name = document.getElementById("name").value;
  if(name){
    document.getElementById("status").innerText =
    "Waiting for Pharaoh Approval...";
  }
}