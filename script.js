let xhr = new XMLHttpRequest()
xhr.open("GET", "http://localhost:3333/jokes")
xhr.onload = function () {
    let result = JSON.parse(xhr.response)
    console.log(result)
    let container = document.querySelector(".container")
    container.innerHTML = ""
    result.forEach(el => {
        container.innerHTML += `
        <div class="joke">
        <div class="joke_content">
            ${el.content}
        </div>
        <div class="joke_footer">
            <div class="likes">
                <span>${el.likes}</span>
                <div class="likeBTN" onclick="like(${el.id})">
                    <i class="fa-regular fa-thumbs-up"></i>
                </div>
            </div>
            <div class="dislikes">
                <span>${el.dislikes}</span>
                <div class="dislikeBTN" onclick="dislike(${el.id})">
                    <i class="fa-regular fa-thumbs-down"></i>
                </div>
            </div>
        </div>
        `
    })
}
xhr.send()


function like(id) {
    let lxml = new XMLHttpRequest()
    lxml.open("get", "http://localhost:3333/like?id="+ id)
    console.log(id)
    lxml.onload = function () {
        location.reload()
    }
    lxml.send()
}

function dislike(id) {
    let lxml = new XMLHttpRequest()
    lxml.open("get", "http://localhost:3333/dislike?id="+ id)
    console.log(id)
    lxml.onload = function () {
        location.reload()
    }
    lxml.send()
}

document.querySelector("button").addEventListener("click", function(){
    let text = document.querySelector("input").value
    let x = new XMLHttpRequest()
    x.open("POST", "http://localhost:3333/jokes")
    onload = function(){
        location.reload()
    }
    x.send(JSON.stringify({content:text}))
})
