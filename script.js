let count = 0;
const fetchAllPost = async (inputText = '') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
    const data = await res.json();
    const posts = data.posts;
    Categories(posts);
}

const Categories = (posts) => {
    console.log(posts)
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = '';

    const errorElement = document.getElementById('no-content-mesage');
    if (posts.length === 0) {
        console.log("no content")
        errorElement.classList.remove('hidden')
    } else {
        errorElement.classList.add('hidden')
    }

    posts.forEach(post => {

        // const activeBadge = document.getElementById("active-badge");
        let activeBadge = '';
        if(post.isActive){
            console.log("active")
            activeBadge = ` 
            <span class="indicator-item badge bg-green-500"></span>
            `
        }else{
            activeBadge = ` 
            <span class="indicator-item badge bg-red-500"></span>
            `
        }



        const postsDiv = document.createElement('div');
        postsDiv.classList = `mb-6 card card-side bg-base-100 shadow-xl bg-[#f3f3f5]`;
        postsDiv.innerHTML = `
        <div class="flex">
    <div class="indicator ml-8 mt-8">
    ${activeBadge}
    <div class=" w-[72px] h-[72px] bg-base-300 place-items-center"> <img class="rounded-2xl" src="${post.image}" alt=""></div>
  </div>
  <div class="pl-8 pt-8 pr-6">
    <div class="flex gap-6">
        <p class="text-xl font-medium text-[#12132dcc]"># <span>${post.category}</span></p>
        <p class="text-xl font-medium text-[#12132dcc]">Author: <span>${post.author.name}</span></p>
    </div>


   <div class="p-2"> 
   <h2 class="card-title text-2xl font-bold text-[#12132d] pt-3 pb-5">${post.title}</h2>
   <p class="text-[#12132d99] text-lg font-medium">${post.description}</p>
   </div>

    <hr class="border-dashed mt-4 mb-4">

    <div class="flex gap-10 mb-8">
        <div class="flex gap-2">
            <img src="images/message (1).png" alt="">
            <p class="text-[#12132d99] text-lg font-normal">${post.comment_count}</p>
        </div>
        <div class="flex gap-2">
            <img src="images/view.png" alt="">
            <p class="text-[#12132d99] text-lg font-normal">${post.view_count}</p>
        </div>
        <div class="flex gap-2">
            <img src="images/clock.png" alt="">
            <p class="text-[#12132d99] text-lg font-normal"> <span>${post.posted_time
            }</span>min</p>
        </div>

        <div onclick="addToList('${post.title.replace(/'/g, '')}', '${post.view_count}'); totalMarkCount()" class="markButton ml-96 cursor-pointer">
        <img src="images/email 1.png" alt="">
        </div>
    </div>
  </div>
  </div>
    `



        postContainer.appendChild(postsDiv)
    });
    toggleLoadingSpinnner(false);

}

const totalCount = document.getElementById("totalCount");
const totalMarkCount = () => {
    count++;
    console.log(count);
    totalCount.innerText = count;
}

const addToList = (title, view) => {

    const appendTitle = document.getElementById("append-title");

    const appendItem = document.createElement('div');
    appendItem.classList = `flex gap-20 bg-white m-4 pl-2 pr-2 rounded-md`;
    appendItem.innerHTML = `
            <h1 class="pt-4 pb-4 text-s font-bold text-[#12132d]">${title}</h1>
            <div class="flex gap-2 pt-4 pb-4">
                <img src="images/view.png" alt="">
                <p class="text-[#12132d99] text-lg font-normal">${view}</p>
            </div>
            `
    appendTitle.appendChild(appendItem);
}

// search field

const handleSearch = () => {
    toggleLoadingSpinnner(true);
    const inputField = document.getElementById('input-text');
    inputText = inputField.value;
    console.log(inputText);
    fetchAllPost(inputText);
}


// latest post section
const fetchLatestPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const LatestPosts = data;
    showLatestPosts(LatestPosts);
}

const showLatestPosts = (LatestPosts) => {
    const latestDiv = document.getElementById('card-container');
    latestDiv.innerHTML = '';

    LatestPosts.forEach(LatestPost => {
        const newDiv = document.createElement('div');
        newDiv.classList = `card w-full border-slate-500 shadow-xl p-6`;
        newDiv.innerHTML = `
        
        <figure class="overflow-hidden max-h-72 rounded-2xl">
                          <img class="w-full " src="${LatestPost.cover_image}" alt="">
                    </figure>
                    <div class="card-body">
                        <div class="flex gap-2">
                           <img src="images/date.png" alt="">
                           <p class="text-xl font-normal text-[#12132d99]">${LatestPost.author.posted_date?LatestPost.author.posted_date:"No publish Date"}</p>
                        </div>
                        <h1 class="mt-4 text-xl font-extrabold text-[#12132d]">${LatestPost.title}</h1>
                        <p class="text-lg font-normal text-[#12132d99]">${LatestPost.description}</p>
                        <div class="mt-4 flex space-x-4 justify-start items-start">
                            <div>
                                <img class="w-12 h-12 rounded-full" src="${LatestPost.profile_image}" alt="">
                            </div>
                            <div>
                                <h2 class="card-title text-xl font-bold text-[#12132d]">${LatestPost.author.name}</h2>
                                 <p class="text-lg font-normal text-[#12132d99]">${LatestPost.author.designation?LatestPost.author.designation:"Unknown"} </p>   
                            </div>
                        </div>
                    </div>
    
        
        `
        latestDiv.appendChild(newDiv);
    })

}

const toggleLoadingSpinnner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }

}
// settimeout
let timeout;

function myFunction() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        toggleLoadingSpinnner(true)
    }, 5000);
}

function hideLoadingSpinner() {
    toggleLoadingSpinnner(false);
    clearTimeout(timeout);
}




fetchAllPost();
fetchLatestPosts();



