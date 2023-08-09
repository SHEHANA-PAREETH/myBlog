


const showImages=()=>{

    const imageInput=document.getElementById("imageInput");
    const imagePreview=document.getElementById('imagePreview');
    document.getElementById('imagePreview').innerHTML=''
    const selectedImages=imageInput.files;
    for(i=0;i<selectedImages.length;i++){
        const image=document.createElement('img')
        image.src=URL.createObjectURL(selectedImages[i])
            image.style.width='150px'
            image.style.margin="3px"
    imagePreview.appendChild(image)}
}

const doAdLogin=()=>{
    adLoginData={}
    adLoginData.name=document.getElementById('name').value
    adLoginData.password=document.getElementById('password').value
    console.log(adLoginData)   

fetch('/admin/adregister',{
    method:'post',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(adLoginData)
}).then((response)=>response.json())
.then((data)=>{
    if(data.login)
    { window.location.href="/admin/home"}
   
    else{
        document.getElementById('wrongadmin').innerHTML="invalid credentials"
        res.redirect('/admin')
    }
   

  })
}



const doLogout=()=>{
    localStorage.clear()
    sessionStorage.clear()
    window.location.href='/admin/logout'//location.assign('/signin') 
}

//delete post
function deletePost(postId){
    console.log(postId);
    fetch('/admin/deletepost',{
        method:'delete',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({postId:postId})
    }).then(res=>res.json())
    .then((response)=>{
        if(response.delete){
            location.reload()
        }
        else{
            alert("something went wrong")
        }
    })

}