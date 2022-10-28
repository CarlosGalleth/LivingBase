
const baseUrl = "https://m2-api-living.herokuapp.com"
let page = 0

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting == true) {
        page++
        buscarPost()
    }
})


async function buscarPost() {
    await fetch(`${baseUrl}/news?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((response) => {
            if (page <= 3) {
                console.log(response)
                renderizarPost(response.news)
            }
        })
}
function renderizarPost(post) {
    let postsList = document.getElementsByClassName("container")[0]
    let choosed = Array.from(document.getElementsByClassName("choosed-btn"))
    let choosedBtn = choosed[0].innerText
    post.forEach(element => {
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
            let strCategory = JSON.stringify(choosedBtn)
            localStorage.setItem("post", strPost)
            localStorage.setItem("category", strCategory)
        })
    });
    let divObserver = document.getElementsByClassName("observer")[0]
    observer.observe(divObserver)
}


async function aspa(buttonCategory) {
    await fetch(`${baseUrl}/news?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((response) => {
            response.news.filter((elem) => {
                console.log(buttonCategory.innerText == elem.category)
            })
        })
}


function filtrarCategoria() {
    let postsList = document.getElementsByClassName("container")[0]
    let post = document.querySelectorAll("#postC")
    post.forEach((elem) => {
        elem.addEventListener('click', () => {
            page = 0
            postsList.innerHTML = ""
            post.forEach((btn) => {
                btn.classList.remove("choosed-btn")
            })
            elem.classList.add("choosed-btn")

            filtrar(elem)            
            /*
            await fetch(`${baseUrl}/news?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((response) => filtrar(response.news, elem))*/
        })
    })
}
filtrarCategoria()
async function filtrar(buttonCategory) {
    aspa(buttonCategory)

    let arrFiltered = post.filter((element) => {
        console.log(element.category)
        return element.category == elem.innerText
    })
    if (elem.innerText == "Todos") {
        renderizarPost(post)
    }
    if (arrFiltered.length == 0) {
        page++
    }
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