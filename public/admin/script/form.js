


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
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            
            
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
            
            
            swal("Poof! Your file has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your file is safe!");
          }
        })
    
}

const blockuser=(blockId)=>{
    
        swal({
            title: "Are you sure?",
            text: " you want to block the user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willBlock) => {
            if (willBlock) {
              
              
              fetch('/admin/blockuser',{
                  method:'put',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({blockId:blockId})
              }).then((resp)=>resp.json())
              .then((data)=>{
                console.log(data);
                if(data.blocked)
                {
                   
                    window.location.href='/admin/user'
                }
                else{
                    
                    window.location.href='/admin/user'
                }
              })
              
              swal("Poof! User has been blocked!", {
                icon: "success",
              });
            } else {
              swal("User is not blocked!");
            }
          })
    }
    
    const unblockuser=(unblockId)=>{
      console.log(unblockId);
            swal({
            title: "Are you sure?",
            text: " you want to unblock the user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willunBlock) => {
            if (willunBlock) {
              
              
              fetch('/admin/unblockuser',{
                  method:'put',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({unblockId:unblockId})
              }).then((resp)=>resp.json())
              .then((data)=>{
                console.log(data);
                if(data.unblocked)
                {
                   
                    window.location.href='/admin/user'
                }
                else{
                    
                    window.location.href='/admin/user'
                }
              })
              
              swal("Poof! User has been unblocked!", {
                icon: "success",
              });
            } else {
              swal("User is not unblocked!");
            }
          })
    }

