let base_url = 'https://organized-alluring-nerine.glitch.me';

document.getElementById('comS').addEventListener('click', async function() {
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
});

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
  let m = document.createElement('div');
  m.className = 'item';
  m.setAttribute('id',post.id);

  let n = document.createElement('div');
  n.className = 'avatar';

  let pic = document.createElement('img');
  pic.className = "port";
  pic.src = "https://www.nicepng.com/png/detail/202-2024580_png-file-profile-icon-vector-png.png";
  m.appendChild(pic);

  let nm = document.createElement('p');
  nm.className = "name";
  nm.innerHTML = post.username;
  n.appendChild(nm);

  let time = document.createElement('p');
  time.className = "time";
  time.innerHTML = post.id+" floor 3-21 12:30pm";

  let info = document.createElement('div');
  info.className = "info";


  let icon = document.createElement('div');
  icon.className = 'icon';

  let iL = document.createElement('i');
  iL.className = "fa fa-regular fa-thumbs-up";
  //iL.setAttribute('id',post.id);
  let iR = document.createElement('i');
  iR.className = "fa fa-regular fa-message";

  //LIKE
  iL.addEventListener('click', async function(){
    //iL.className = "fa fa-thumbs-up";
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
    console.log('POST /like returned', returned_post);
    });

  //REPLY
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
      let rT = document.createElement('p');
      rT.className = "rT";
      rT.innerHTML = rC.value + " and other replies";

      let replyD = document.createElement('div');
      replyD.className = "replyD";
      replyD.appendChild(rT);
      n.appendChild(replyD);
      rC.remove();
      rS.remove();


    });


  });

  icon.appendChild(iL);
  icon.appendChild(iR);

  info.appendChild(time);
  info.appendChild(icon);

  let cm = document.createElement('p');
  cm.className = "desc";
  cm.innerHTML = post.text;
  n.appendChild(cm);
  n.appendChild(info);
  m.appendChild(n);

    document.getElementById("list").appendChild(m);

    // for (reply of post.replies) {

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



  let container = document.getElementById('list');
  container.innerHTML = '';

  for (post of posts) {
    let m = document.createElement('div');
    m.className = 'item';
    m.setAttribute('id',post.id);
    let lId = m.id;

    let n = document.createElement('div');
    n.className = 'avatar';

    let pic = document.createElement('img');
    pic.className = "port";
    pic.src = "https://www.nicepng.com/png/detail/202-2024580_png-file-profile-icon-vector-png.png";
    m.appendChild(pic);

    let nm = document.createElement('p');
    nm.className = "name";
    nm.innerHTML = post.username;
    n.appendChild(nm);

    let time = document.createElement('p');
    time.className = "time";
    time.innerHTML = post.id+" floor 3-21 12:30pm";

    let info = document.createElement('div');
    info.className = "info";


    let icon = document.createElement('div');
    icon.className = 'icon';

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
      console.log('POST /like returned', returned_post);
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
        let rT = document.createElement('p');
        rT.className = "rT";
        rT.innerHTML = rC.value + " and other replies";
        let replyD = document.createElement('div');
        replyD.className = "replyD";
        replyD.appendChild(rT);
          n.appendChild(replyD);
          rC.remove();
          rS.remove();




      });


    });

    icon.appendChild(iL);
    icon.appendChild(iR);

    info.appendChild(time);
    info.appendChild(icon);

    let cm = document.createElement('p');
    cm.className = "desc";
    cm.innerHTML = post.text;
    n.appendChild(cm);
    n.appendChild(info);
    m.appendChild(n);

    // for (post of posts) {
    //   let post_p = document.createElement('p');
    //   post_p.className = 'post';
    //   post_p.innerHTML = post.username + ': ' + post.text;
    //   m.appendChild(post_p);

      // for (reply of post.replies) {
      //   let reply_p = document.createElement('p');
      //   reply_p.className = 'reply';
      //   reply_p.innerHTML = reply.username + ': ' + reply.text;
      //   post_p.appendChild(reply_p);
      // }

      //container.appendChild(m);
    // }
      document.getElementById("list").appendChild(m);

      // for (reply of post.replies) {
      //   let reply_p = document.createElement('p');
      //   reply_p.className = 'reply';
      //   reply_p.innerHTML = reply.username + ': ' + reply.text;
      //   post_p.appendChild(reply_p);
      // }
}

}

list();
