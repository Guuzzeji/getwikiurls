function search_list(input, fitler){
    fetch('/api/get-urls', {
    method: 'POST',  
    body: JSON.stringify({ parms: input}), 
    headers: {'Content-Type': 'application/json'} })
    .then(function(res){
        return res.json()
    }).then(function(data){
        if(data.error == undefined){
            let dom_list = document.getElementById('urls-list')
            dom_list.innerText = ''
            if(data.length <= 0){
                dom_list.innerText = 'Could not find urls'
                return
            }
            if(fitler == 'all'){
                for(let x = 0; x < data.length; x++){
                    let li = document.createElement('li')
                    let a = document.createElement('a')
                    a.href = data[x]
                    a.innerText = data[x]
                    li.appendChild(a)
                    dom_list.appendChild(li)
                }
            }else if(fitler == '.com'){
                dom_list.innerText = ''
                for(let x = 0; x < data.length; x++){
                    if(data[x].search('.com') != -1){
                        let li = document.createElement('li')
                        let a = document.createElement('a')
                        a.href = data[x]
                        a.innerText = data[x]
                        li.appendChild(a)
                        dom_list.appendChild(li)
                    }
                }
            }else if(fitler == '.org'){
                dom_list.innerText = ''
                for(let x = 0; x < data.length; x++){
                    if(data[x].search('.org') != -1){
                        let li = document.createElement('li')
                        let a = document.createElement('a')
                        a.href = data[x]
                        a.innerText = data[x]
                        li.appendChild(a)
                        dom_list.appendChild(li)
                    }
                }
            }
        }else{
            let dom_list = document.getElementById('urls-list')
            dom_list.innerText = ''
            dom_list.innerText = 'Could not find urls'
        }
    })
}

function terms_list(input){
    fetch('/api/get-other-terms', {
    method: 'POST',  
    body: JSON.stringify({ parms: input}), 
    headers: {'Content-Type': 'application/json'} })
    .then(function(res){
        return res.json()
    }).then(function(data){
        if(data.error == undefined){
            let dom_list = document.getElementById('other-terms')
            dom_list.innerText = ''
            if(data.length <= 0){
                dom_list.innerText = 'Could not find terms'
                return
            }
            for(let x = 0; x < data.length; x++){
                let li = document.createElement('li')
                let label = document.createElement('label')
                label.innerText = data[x]
                li.appendChild(label)
                dom_list.appendChild(li)
            }
        }else{
            let dom_list = document.getElementById('other-terms')
            dom_list.innerText = ''
            dom_list.innerText = 'Could not find terms'
        }
    })
}

function search_btn_input(filter){
    let input_val = document.getElementById('search_input').value
    document.getElementById('url-title').style.display = 'block'
    document.getElementById('terms-title').style.display = 'block'
    search_list(input_val, filter)
    terms_list(input_val, filter)
}

document.getElementById('btn_input').addEventListener('click', function(){
    search_btn_input('all')
})
document.getElementById('search_input').addEventListener('keypress', function(e){
    if(e.which == 13){
        search_btn_input('all')
    }
})

document.getElementById('.com_btn').addEventListener('click', function(e){
    search_btn_input('.com')
})
document.getElementById('.org_btn').addEventListener('click', function(e){
    search_btn_input('.org')
})
document.getElementById('all_btn').addEventListener('click', function(e){
    search_btn_input('all')
})



