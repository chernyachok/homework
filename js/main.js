$(document).ready(function(){
    $('#getContributors').on('click', ()=>{
      $('#output').html('');
      var username = $('#searchUser').val();
      $.getJSON(`https://api.github.com/users/${username}/repos?client_id=89b091d7099eceb6c49f&client_secret=7a8344235140387b3cf0829e2d6c06264941ea2a`)
      .done((data)=>{
          $.each(data, (index, item)=>{
            $('#output').append(`<ul><li>${item.name}<ul id='result${index}'></ul></li></ul>`)
            $.getJSON(`https://api.github.com/repos/${username}/${item.name}/contributors?client_id=89b091d7099eceb6c49f&client_secret=7a8344235140387b3cf0829e2d6c06264941ea2a`)
            .done((data1)=>{
              $.each(data1, (i, item1)=>{
                $(`#result${index}`).append(`<li>${item1.login}</li>`)
                console.log(`${item.name} repo conrtibutor name: `+item1.login);
              })
            })
            if(index==2) return false;
          })
      })
      .fail((data, status)=>{
          alert('user not found');
      })
    })
})
