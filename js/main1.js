$(document).ready(function(){

    const getRepos = url=>{
      return new Promise((resolve, reject)=>{
        $.getJSON(url)
        .done((data)=>{
          //resolve(data);
          const urls = []
          $.each(data, (index, item)=>{
            urls.push(item.name);
          })
          resolve(urls);
        })
        .fail(()=>{
          reject('user not found');
        })
      })
    }

    var getContributors = (name, item)=>{
      return new Promise((resolve, reject)=>{
        $.getJSON(`https://api.github.com/repos/${name}/${item}/contributors?client_id=89b091d7099eceb6c49f&client_secret=7a8344235140387b3cf0829e2d6c06264941ea2a`)
        .done((data)=>{
          var contrs = []
          $.each(data, (index, item)=>{
            contrs.push(item.login);
          })
          resolve(contrs);
        })
      })
    }

    var getData = username =>{
      getRepos(`https://api.github.com/users/${username}/repos?client_id=89b091d7099eceb6c49f&client_secret=7a8344235140387b3cf0829e2d6c06264941ea2a`)
      .then((result)=>{
        result.forEach((item, index)=>{
           getContributors(username, item)
           .then((data)=>{
             console.log('Current repo: '+item);
             console.log(data);
             $('#output').append(`<ul><li>Current repo: ${item}<ul id='result${index}'></ul></li></ul>`)
             data.forEach((item1,ind)=>{
               $(`#result${index}`).append(`<li>${item1}</li>`)
             })
           })
        })
      //  console.log(result);
      })
    }

  $('#getContributors').click(function(){
    var username = $('#searchUser').val();
    getData(username);
  })


});
