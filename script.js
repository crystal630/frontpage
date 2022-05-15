let base_url = 'https://organized-alluring-nerine.glitch.me';
let newId = 1;
let status = false;
console.log(status);

  let useIt = localStorage.getItem("lastname");
  console.log(useIt);
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


document.getElementById('comS').addEventListener('click', getData);

async function getData(){

  let storageD = document.getElementById('userName').value;


    //The frame is provided by Prof Haider
    // Set Item
  localStorage.setItem("lastname", storageD);
  let post = {
    username: document.getElementById('userName').value,
    text: document.getElementById('search').value
  };

  let response = await fetch(base_url + '/post', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });

  let returned_post = await response.json();
  console.log('POST /post returned', returned_post);
}

//SUBMIT A NEW COMMENT
document.getElementById('comS').addEventListener('click', async function(){

  //The frame is provided by Prof Haider
  let post = {
    username: document.getElementById('userName').value,
    text: document.getElementById('search').value
  };
  let response = await fetch(base_url + '/posts', {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });


  let posts = await response.json();
  console.log('GET /posts returned', posts);

console.log(posts.length);

  let container = document.getElementById('list');
  container.innerHTML = '';


  for (post of posts) {

    function submitDate(){

      var date = new Date(post.created_at);

        let year = date.getFullYear().toString();
        let mon =date.getMonth().toString();
        let d =date.getDate().toString();
        let h =date.getHours().toString();
        let min =  date.getMinutes().toString();
        let sec =  date.getSeconds().toString();
        return year + "-" + mon + "-" + d + " " + h + ":" + min + ":" + sec;
    }


    let m = document.createElement('div');
    m.className = 'item';


    var num = document.getElementById("list").childNodes.length-1;
    m.setAttribute("id",posts.length-num);
      document.getElementById("list").appendChild(m);

    container.insertBefore(m, container.firstChild);



    let n = document.createElement('div');
    n.className = 'avatar';
    n.setAttribute('id',post.id);
    let lId = n.id;





    let pic = document.createElement('img');
    pic.className = "port";
    pic.src = "https://www.nicepng.com/png/detail/202-2024580_png-file-profile-icon-vector-png.png";
    m.appendChild(pic);

    let nm = document.createElement('p');
    nm.className = "name";
    nm.innerHTML = post.username;
    n.appendChild(nm);


        let replyD = document.createElement('div');
        replyD.className = "replyD";



        replyD.addEventListener("click", async function(){

          //  let status=true;
          // console.log(status);

          let like = {
            id: lId,
            username: "skip"
          };

          let response = await fetch(base_url + '/like', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
           body: JSON.stringify(like)
          });

          let returned_post = await response.json();
         console.log('POST /post returned', returned_post);

           for(i=0;i<returned_post.replies.length;i++){
             let tst = Object.values(returned_post.replies[i]);
               let another = tst[0];
               console.log(another);
               let ppp = document.createElement("p");
               replyD.appendChild(ppp);
               ppp.innerHTML = another;
           }




        },{once : true});
    let time = document.createElement('p');
    time.className = "time";

    time.innerHTML = m.id +" floor " + submitDate();

    let info = document.createElement('div');
    info.className = "info";


    let icon = document.createElement('div');
    icon.className = 'icon';

  ////like////



    let iL = document.createElement('i');
    iL.className = "fa fa-regular fa-thumbs-up";

    let likeN = document.createElement('p');
    likeN.innerHTML = post.likes.length;
    likeN.setAttribute("id", "likeN");


    let iR = document.createElement('i');
    iR.className = "fa fa-regular fa-message";
    iL.addEventListener('click', async function(){
      iL.className = "fa fa-thumbs-up";

      let like = {
        id: lId,
        username: "noname"
      };

      if(useIt==""){
        like.username = "noname";
      }else{
        like.username = useIt;

      }

      let response = await fetch(base_url + '/like', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(like)
      });

      let returned_post = await response.json();
     console.log('POST /post returned', returned_post);

      });
    iR.addEventListener('click', function(){


      let rC = document.createElement('input');
      rC.className = "rC";
      let rS = document.createElement('button');
      rS.className = "rS";
      let t = document.createTextNode("submit");
      rS.appendChild(t);
      m.appendChild(rC);
      m.appendChild(rS);

        rS.addEventListener('click', async function(){

          //The frame is provided by Prof Haider
          console.log("test");
          let post = {
            username: document.getElementsByClassName('name').value,
            text: rC.value,
            parent: lId
          };

          let response = await fetch(base_url + '/post', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          });

          let returned_post = await response.json();
          console.log('POST /post returned', returned_post);
          console.log('post');

            rC.remove();
            rS.remove();




        });

      });

    icon.appendChild(iR);
    icon.appendChild(iL);
      icon.appendChild(likeN);

    info.appendChild(time);
    info.appendChild(icon);

    let cm = document.createElement('p');
    cm.className = "desc";
    cm.innerHTML = post.text;
    n.appendChild(cm);
    let rT = document.createElement('p');
    rT.className = "rT";
    rT.innerHTML = "check other " + post.replies.length + " replies";
    replyD.appendChild(rT);
    n.appendChild(replyD);
    n.appendChild(info);
    m.appendChild(n);


}

  window.location.reload()

});

async function list() {


  // Retrieve

  console.log(useIt)

    //The frame is provided by Prof Haider
  let post = {
    username: document.getElementById('userName').value,
    text: document.getElementById('search').value
  };
  let response = await fetch(base_url + '/posts', {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });


  let posts = await response.json();
  console.log('GET /posts returned', posts);

console.log(posts.length);

  let container = document.getElementById('list');
  container.innerHTML = '';

  // let storageD = document.getElementById('userName').value;
  // console.log(storageD)
  //   // Set Item
  // localStorage.setItem("usernameL", storageD);
  // // Retrieve
  // let useIt = localStorage.getItem("usernameL");
  // console.log(useIt)
  for (post of posts) {


    function submitDate(){

      var date = new Date(post.created_at);

        let year = date.getFullYear().toString();
        let mon =date.getMonth().toString();
        let d =date.getDate().toString();
        let h =date.getHours().toString();
        let min =  date.getMinutes().toString();
        let sec =  date.getSeconds().toString();
        return year + "-" + mon + "-" + d + " " + h + ":" + min + ":" + sec;
    }

    let m = document.createElement('div');
    m.className = 'item';
    document.getElementById("list").appendChild(m);

    var num = document.getElementById("list").childNodes.length-1;
    m.setAttribute("id",posts.length-num);

      container.insertBefore(m, container.firstChild);
      document.getElementById("reverse").addEventListener("click",function(){
        container.appendChild(m);
      });
      document.getElementById("order").addEventListener("click",function(){
        container.insertBefore(m, container.firstChild);
      });

    // }




    let n = document.createElement('div');
    n.className = 'avatar';
    n.setAttribute('id',post.id);
    let lId = n.id;


    let pic = document.createElement('img');
    pic.className = "port";
    pic.src = "https://www.nicepng.com/png/detail/202-2024580_png-file-profile-icon-vector-png.png";
    m.appendChild(pic);

    let nm = document.createElement('p');
    nm.className = "name";
    nm.innerHTML = post.username;
    n.appendChild(nm);

    let replyD = document.createElement('div');
    replyD.className = "replyD";




    replyD.addEventListener("click", async function(){

        //The frame is provided by Prof Haider
      let like = {
        id: lId,
        username: "skip"
      };

      let response = await fetch(base_url + '/like', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(like)
      });

      let returned_post = await response.json();
     console.log('POST /post returned', returned_post);

       for(i=0;i<returned_post.replies.length;i++){
         console.log("test")
         let tst = Object.values(returned_post.replies[i]);
           let another = tst[0];
           console.log(another);
           let ppp = document.createElement("p");
           replyD.appendChild(ppp);
           ppp.innerHTML = another;
       }




    },{once : true});

    let time = document.createElement('p');
    time.className = "time";

    time.innerHTML = m.id +" floor " + submitDate();

    let info = document.createElement('div');
    info.className = "info";


    let icon = document.createElement('div');
    icon.className = 'icon';

  ////like////



    let iL = document.createElement('i');
    iL.className = "fa fa-regular fa-thumbs-up";

    let likeN = document.createElement('p');
    likeN.innerHTML = post.likes.length;
    likeN.setAttribute("id", "likeN");


    let iR = document.createElement('i');
    iR.className = "fa fa-regular fa-message";
    iL.addEventListener('click', async function(){



      iL.className = "fa fa-thumbs-up";

      //The frame is provided by Prof Haider
      let like = {
        id: lId,
        username: "noname"
      };

      if(useIt==""){
        like.username = "noname";
      }else{
        like.username = useIt;
      }

      let response = await fetch(base_url + '/like', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(like)
      });

      let returned_post = await response.json();
     console.log('POST /post returned', returned_post);

      });
    iR.addEventListener('click', function(){
        console.log(post.replies.length);


        let rC = document.createElement('input');
        rC.className = "rC";
        let rS = document.createElement('button');
        rS.className = "rS";
        let t = document.createTextNode("submit");
        rS.appendChild(t);
        m.appendChild(rC);
        m.appendChild(rS);


          rS.addEventListener('click', async function(){
            console.log("test");
            let post = {
              username: document.getElementsByClassName('name').value,
              text: rC.value,
              parent: lId
            };

            let response = await fetch(base_url + '/post', {
              method: 'POST',
              cache: 'no-cache',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(post)
            });

            let returned_post = await response.json();
            console.log('POST /post returned', returned_post);
            console.log('post');




              rC.remove();
              rS.remove();




          });




    });
    icon.appendChild(iR);
    icon.appendChild(iL);
      icon.appendChild(likeN);


    info.appendChild(time);
    info.appendChild(icon);

    let cm = document.createElement('p');
    cm.className = "desc";
    cm.innerHTML = post.text;
    n.appendChild(cm);
    let rT = document.createElement('p');
    rT.className = "rT";
    rT.innerHTML = "check other " + post.replies.length + " replies";
    replyD.appendChild(rT);
    n.appendChild(replyD);
    n.appendChild(info);
    m.appendChild(n);


}
}

// }
list();

//setInterval(list,3000);
