let xhr = new XMLHttpRequest()
xhr.open("localhost:3333")
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.send()