const fetchAllPost = async (inputText='posts') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
    const data = await res.json();
    const posts = data.posts;
    buttonClickCategories(posts);
}

// const fetchpostbyCategory = async (inputText) => {
//     const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
//     const data = await res.json();
//     const searchPosts = data.posts;
//     buttonClickCategories(searchPosts);
// }

const signInButton = document.getElementById("input-button");
signInButton.addEventListener



const buttonClickCategories = (posts) => {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = '';
    // let activeBadge = '';
    
    posts.forEach(post => {
        console.log(post)
     
        const postsDiv = document.createElement('div');
    postsDiv.classList = `mb-6 card card-side bg-base-100 shadow-xl bg-[#f3f3f5]`;
    postsDiv.innerHTML = `
    <div class="indicator ml-8 mt-8">
    <span id="active-badge" class=" hidden indicator-item badge badge-secondary"></span> 
    <div class="grid w-[72px] h-[72px] bg-base-300 place-items-center"> <img class="rounded-2xl" src="${post.image}" alt=""></div>
  </div>
  <div class="ml-8 mt-8 pr-6">
    <div class="flex gap-6">
        <p class="text-xl font-medium text-[#12132dcc]"># <span>${post.category}</span></p>
        <p class="text-xl font-medium text-[#12132dcc]">Author: <span>${post.author.name}</span></p>
    </div>
    <h2 class="card-title text-2xl font-bold text-[#12132d] mt-3 mb-5">${post.title}</h2>
    <p class="text-[#12132d99] text-xl font-medium">${post.description}</p>

    <hr class="border-dashed mt-4 mb-4">

    <div class="flex gap-10 mb-8">
        <div class="flex gap-2">
            <img src="images/message (1).png" alt="">
            <p class="text-[#12132d99] text-lg font-normal">${post.comment_count}</p>
        </div>
        <div class="flex gap-2">
            <img src="images/view.png" alt="">
            <p class="text-[#12132d99] text-lg font-normal">${post.view_count
            }</p>
        </div>
        <div class="flex gap-2">
            <img src="images/clock.png" alt="">
            <p class="text-[#12132d99] text-lg font-normal"> <span>${post.posted_time
            }</span>min</p>
        </div>

        <div class="ml-96">
            <img src="images/email 1.png" alt="">
        </div>
    </div>
</div>
    `
    // const activeBadge = document.getElementById("active-badge");
    // if(post.isActive == true){
    //     activeBadge.classList.remove('hidden')
    // }else{
    //     activeBadge.classList.add('hidden')
    // }

    postContainer.appendChild(postsDiv)
    });
    
}

const handleSearch = () =>{
     const inputField = document.getElementById('input-text');
     inputText = inputField.value ;
     console.log(inputText);
     fetchAllPost(inputText);
}

const fetchLatestPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const LatestPosts  = data;
    console.log(LatestPosts)
    showLatestPosts(LatestPosts);
}

const showLatestPosts = (LatestPosts) =>{
        const latestDiv = document.getElementById('card-container');
        latestDiv.innerHTML ='';
        
        LatestPosts.forEach(LatestPost => {
        console.log(LatestPost);
        const newDiv = document.createElement('div');
        newDiv.classList = `card w-full border-slate-500 shadow-xl p-6`;
        newDiv.innerHTML = `
        
        <figure class="overflow-hidden max-h-72 rounded-2xl">
                          <img class="w-full " src="${LatestPost.cover_image}" alt="">
                    </figure>
                    <div class="card-body">
                        <div class="flex gap-2">
                           <img src="images/date.png" alt="">
                           <p class="text-xl font-normal text-[#12132d99]">${LatestPost.author.posted_date}</p>
                        </div>
                        <h1 class="mt-4 text-xl font-extrabold text-[#12132d]">${LatestPost.title}</h1>
                        <p class="text-lg font-normal text-[#12132d99]">${LatestPost.description}</p>
                        <div class="mt-4 flex space-x-4 justify-start items-start">
                            <div>
                                <img class="w-12 h-12 rounded-full" src="${LatestPost.profile_image}" alt="">
                            </div>
                            <div>
                                <h2 class="card-title text-xl font-bold text-[#12132d]">${LatestPost.author.name}</h2>
                                 <p class="text-lg font-normal text-[#12132d99]">${LatestPost.author.designation}</p>   
                            </div>
                        </div>
                    </div>
    
        
        `
        latestDiv.appendChild(newDiv);
      })

      
      
      
}


fetchAllPost();
fetchLatestPosts();



