
async function renderizarPost() {
    let post = localStorage.getItem("post")
    let postJS = JSON.parse(post)
    let postTitle = document.getElementById("post-title")
    let postDescription = document.getElementById("post-description")
    let postImg = document.getElementById("post-img")
    let postContent = document.getElementById("post-content")

    postTitle.innerText = postJS.title
    postDescription.innerText = postJS.description
    postImg.src = postJS.image
    postContent.innerText = postJS.content
}

function retornar() {
    let returnBtn = document.getElementById("return")
    returnBtn.addEventListener('click', () => {
        window.location.assign("../home/index.html")
    })
}
retornar()

function voltarAoTopo() {
    let backTop = document.getElementById("back-to-top")
    backTop.addEventListener('click', () =>{
        window.scrollTo(0, 0)
    })
}
voltarAoTopo()

function filtrarCategoria() {
    let category = JSON.parse(localStorage.getItem("category"))
    let post = Array.from(document.querySelectorAll("#postC"))

    post.forEach((elem) => {
        if (elem.innerText == category) {
            elem.classList.add("choosed-btn")
        }

        elem.addEventListener('click', async () => {
            post.forEach((btn) => {
                btn.classList.remove("choosed-btn")
            })
            elem.classList.add("choosed-btn")
        })
    })
}
filtrarCategoria()

renderizarPost()