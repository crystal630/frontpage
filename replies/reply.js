let base_url = 'https://organized-alluring-nerine.glitch.me';
let newId = 1;
let replyC = []


async function list() {

  let post = {
    //username: document.getElementById('userName').value,
  //  text: document.getElementById('search').value
  };
  let response = await fetch(base_url + '/posts', {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });


  let posts = await response.json();
  console.log('GET /posts returned', posts);


  for (post of posts) {



    const idValue = localStorage.getItem('tL');
    let cm = document.createElement('p');
     console.log(idValue);

     if(typeof(post.replies[idValue]) != 'undefined'){

      const obj = post.replies;
      console.log(obj);
      for(i=0;i<obj.length;i++){
        let realT = Object.values(obj[i]);
        console.log(realT[0]);
        replyC.push(realT[0]);
        console.log(replyC);

      }


      for(i=0;i<replyC.length;i++){
        let txt = document.createElement("p");
        txt.innerHTML=replyC[i];
        console.log(txt);
        const boxes =  document.getElementById("box")
        box.appendChild(txt);

        //  let txt = document.getElementById("txt");
        //  let cmt = document.getElementsByClassName("comment");
        //  let list = document.getElementById("list");
        //  cmt.appendChild(txt);
        //  list.appendChild(cmt);
        //  txt.innerHTML = replyC[i];
        // console.log(replyC[i]);
      }

    }

    }
}

list();
