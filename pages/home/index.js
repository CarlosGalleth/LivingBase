
const baseUrl = "https://m2-api-living.herokuapp.com"

async function buscarPost() {
    await fetch(`${baseUrl}/news?page=1`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((response) => renderizarPost(response.news))
}
function renderizarPost(post) {
    post.forEach(element => {
        let postsList = document.getElementsByClassName("container")[0]

        let li = document.createElement("li")
        li.classList = "post flex flex-col"

        let postImg = document.createElement("img")
        postImg.src = element.image

        let divInfo = document.createElement("div")
        let h3Title = document.createElement("h3")
        let pDescription = document.createElement("p")
        let accessContent = document.createElement("a")

        divInfo.classList = "post-info flex flex-col"
        h3Title.innerText = element.title
        pDescription.innerText = element.description
        accessContent.innerText = "Acessar conteúdo"
        accessContent.href = "../post/index.html"
        accessContent.target = "_blank"
        divInfo.append(h3Title, pDescription, accessContent)
        li.append(postImg, divInfo)
        postsList.append(li)

        accessContent.addEventListener('click', () => {
            let strPost = JSON.stringify(element)
            localStorage.setItem("post", strPost)
        })
    });
}

function filtrarCategoria() {
    let postsList = document.getElementsByClassName("container")[0]
    let post = document.querySelectorAll("#postC")
    post.forEach((elem) => {
        elem.addEventListener('click', async () => {
            postsList.innerHTML = ""
            post.forEach((btn) => {
                btn.classList.remove("choosed-btn")
            })
            elem.classList.add("choosed-btn")

            await fetch(`${baseUrl}/news?page=1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((response) => filtrar(response.news, elem))
        })
    })
}
filtrarCategoria()
function filtrar(post, elem) {
    let arrFiltered = []
    post.forEach((element) => {
        if (element.category == elem.innerText) {
            arrFiltered.push(element)
        }
        if (elem.innerText == "Todos") {
            arrFiltered.push(element)
        }
    })
    renderizarPost(arrFiltered)
}

function irAoConteudo() {
    let goContent = document.getElementById("go-to-content")
    goContent.addEventListener('click', () =>{
        window.scrollTo(0, 580)
    })
}
irAoConteudo()
function voltarAoTopo() {
    let backTop = document.getElementById("back-to-top")
    backTop.addEventListener('click', () =>{
        window.scrollTo(0, 0)
    })
}
voltarAoTopo()
buscarPost()