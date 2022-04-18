let base_url = 'https://organized-alluring-nerine.glitch.me';
let newId = 1;

//get time


document.getElementById('comS').addEventListener('click', getData);

async function getData(){
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
      for(i=0;i<post.replies.length;i++){
        let tst = Object.values(returned_post.replies[i]);
          let another = tst[0];
          console.log(another);
          let ppp = document.createElement("p");
          replyD.appendChild(ppp);
          ppp.innerHTML = another;
      }



    });

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

    let iR = document.createElement('i');
    iR.className = "fa fa-regular fa-message";
    iL.addEventListener('click', async function(){

      iL.className = "fa fa-thumbs-up";
      let like = {
        id: lId,
        username: document.getElementById('userName').value
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
        // for(i=0;i<post.replies.length;i++){
        //   let tst = Object.values(returned_post.replies[i]);
        //     let another = tst[0];
        //     console.log(another);
        //     let ppp = document.createElement("p");
        //     replyD.appendChild(ppp);
        //     ppp.innerHTML = another;
        // }



          rC.remove();
          rS.remove();




      });


    });
    icon.appendChild(iR);
    icon.appendChild(iL);


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
    document.getElementById("list").appendChild(m);

    var num = document.getElementById("list").childNodes.length-1;
    m.setAttribute("id",posts.length-num);


    container.insertBefore(m, container.firstChild);



    let n = document.createElement('div');
    n.className = 'avatar';
    n.setAttribute('id',post.id);
    let lId = n.id;




    // function test(){
    //   var wrapper = document.getElementById('list').childNodes;
    //    var id = wrapper.length+1;
    //    for (var i = 0; i < wrapper.length; i++) {
    //      if (wrapper[i].nodeName === "DIV") {
    //        id -= 1;
    //      }
    //   return id;
    //    }
    // }



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
      for(i=0;i<post.replies.length;i++){
        let tst = Object.values(returned_post.replies[i]);
          let another = tst[0];
          console.log(another);
          let ppp = document.createElement("p");
          replyD.appendChild(ppp);
          ppp.innerHTML = another;
      }



    });

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

    let iR = document.createElement('i');
    iR.className = "fa fa-regular fa-message";
    iL.addEventListener('click', async function(){

      iL.className = "fa fa-thumbs-up";
      let like = {
        id: lId,
        username: document.getElementById('userName').value
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
        // for(i=0;i<post.replies.length;i++){
        //   let tst = Object.values(returned_post.replies[i]);
        //     let another = tst[0];
        //     console.log(another);
        //     let ppp = document.createElement("p");
        //     replyD.appendChild(ppp);
        //     ppp.innerHTML = another;
        // }



          rC.remove();
          rS.remove();


    

      });


    });
    icon.appendChild(iR);
    icon.appendChild(iL);


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
